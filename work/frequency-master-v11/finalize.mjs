import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourcePath = process.argv[2];
const outputDir = process.argv[3];
const outputName = "2005–2025｜84篇阅读正式词频母表 V1.1锁定版.xlsx";
const outputPath = path.join(outputDir, outputName);
const previewDir = path.join(outputDir, "qa-previews");

const expectedSheets = [
  "总览",
  "84篇对账",
  "正式词频母表",
  "A-B候选池",
  "规则与说明",
  "1500核心词候选池",
  "原500复现层",
  "1500候选池说明",
];

const previewRanges = {
  "总览": "A1:E11",
  "84篇对账": "A1:H85",
  "正式词频母表": "A1:P30",
  "A-B候选池": "A1:P30",
  "规则与说明": "A1:B16",
  "1500核心词候选池": "A1:R30",
  "原500复现层": "A1:J30",
  "1500候选池说明": "A1:B8",
};

function asNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error(`Expected number, got ${value}`);
  return number;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function splitList(value) {
  if (value == null || value === "") return [];
  return String(value).split(/[、,，]/).map((item) => item.trim()).filter(Boolean);
}

async function validateWorkbook(workbook, phase) {
  const warnings = [];
  const sheetInspection = await workbook.inspect({ kind: "sheet", include: "id,name", maxChars: 12000 });
  const sheetLines = String(sheetInspection.ndjson ?? "").split(/\r?\n/).filter((line) => line.trim().startsWith("{"));
  const sheetRecords = sheetLines.map((line) => JSON.parse(line)).filter((item) => item.kind === "sheet");
  const sheetNames = sheetRecords.map((item) => item.name);

  assert(sheetNames.length === expectedSheets.length, `${phase}: expected ${expectedSheets.length} sheets, got ${sheetNames.length}`);
  assert(new Set(sheetNames).size === sheetNames.length, `${phase}: duplicate sheet names found`);
  assert(expectedSheets.every((name, index) => sheetNames[index] === name), `${phase}: sheet names/order changed`);
  assert(sheetRecords.every((sheet) => sheet.range && sheet.range !== "A1"), `${phase}: blank sheet found`);

  const formulaInspection = await workbook.inspect({ kind: "formula", maxChars: 12000, options: { maxResults: 1000 } });
  const formulaText = String(formulaInspection.ndjson ?? "");
  const formulaCount = formulaText.split(/\r?\n/).filter((line) => line.includes('"kind":"formula"')).length;
  const errorInspection = await workbook.inspect({
    kind: "match",
    searchTerm: "#REF!|#VALUE!|#DIV/0!|#NAME\\?|#N/A|#NUM!|#NULL!",
    options: { useRegex: true, maxResults: 1000 },
    maxChars: 16000,
  });
  const errorText = String(errorInspection.ndjson ?? "");
  if (!errorText.includes("matched 0 entries")) warnings.push(errorText);
  assert(warnings.length === 0, `${phase}: spreadsheet errors found: ${warnings.join("; ")}`);

  const overview = workbook.worksheets.getItem("总览").getRange("A1:E11").values;
  assert(String(overview[0][0]).includes("V1.1锁定版"), `${phase}: overview title is not V1.1 locked`);
  assert(asNumber(overview[3][1]) === 84, `${phase}: overview sample count is not 84`);
  const overviewTokens = asNumber(overview[4][1]);
  assert(String(overview[9][4]).includes("2019-T4已补齐P6–P7"), `${phase}: overview patch note missing`);
  assert(String(overview[9][4]).includes("443"), `${phase}: overview does not confirm 443 tokens`);

  const auditRows = workbook.worksheets.getItem("84篇对账").getRange("A1:H85").values;
  const auditHeader = auditRows[0].map(String);
  assert(auditHeader.join("|") === "样本ID|年份|Text|历史参考词数|本次实际Tokens|差值|质检状态|来源/备注", `${phase}: audit columns changed`);
  const articles = auditRows.slice(1);
  assert(articles.length === 84, `${phase}: audit article count is not 84`);
  const ids = articles.map((row) => String(row[0]));
  assert(new Set(ids).size === 84, `${phase}: duplicate article IDs found`);
  const expectedIds = [];
  for (let year = 2005; year <= 2025; year += 1) {
    for (let text = 1; text <= 4; text += 1) expectedIds.push(`${year}-T${text}`);
  }
  assert(expectedIds.every((id, index) => ids[index] === id), `${phase}: article sequence/range is not exactly 2005-T1 through 2025-T4`);
  assert(articles.every((row) => String(row[6]) === "通过" || String(row[6]) === "关注"), `${phase}: unexpected QA state`);

  const patched = articles.find((row) => String(row[0]) === "2019-T4");
  assert(patched, `${phase}: 2019-T4 missing`);
  assert(asNumber(patched[4]) === 443, `${phase}: 2019-T4 Tokens is not 443`);
  assert(asNumber(patched[5]) === 0, `${phase}: 2019-T4 audit difference is not 0`);
  assert(String(patched[6]) === "通过", `${phase}: 2019-T4 QA state is not 通过`);
  assert(String(patched[7]).includes("P6–P7") && String(patched[7]).includes("145 Tokens"), `${phase}: 2019-T4 patch evidence missing`);

  const rules = workbook.worksheets.getItem("规则与说明").getRange("A1:B16").values;
  const ruleMap = new Map(rules.slice(1).map((row) => [String(row[0]), String(row[1])]));
  assert(ruleMap.get("版本") === "V1.1锁定版", `${phase}: rules version mismatch`);
  assert(ruleMap.get("2019-T4修补")?.includes("P6–P7"), `${phase}: rules patch note missing P6–P7`);
  assert(ruleMap.get("2019-T4修补")?.includes("2019-T4=443"), `${phase}: rules patch note missing 443`);
  assert(ruleMap.get("锁定结果")?.includes("84/84"), `${phase}: lock result does not confirm 84/84`);

  const freqSheet = workbook.worksheets.getItem("正式词频母表");
  const freqHeader = freqSheet.getRange("A1:P1").values[0].map(String);
  assert(freqHeader.length === 16 && freqHeader[0] === "统计词元（初步归一）" && freqHeader[15] === "机器候选等级", `${phase}: frequency table columns changed`);
  const lemmaSet = new Set();
  let frequencySum = 0;
  let previousFrequency = Number.POSITIVE_INFINITY;
  let formFrequencyMismatchCount = 0;
  let articleCountMismatchCount = 0;
  let yearCountMismatchCount = 0;
  let invalidArticleReferenceCount = 0;
  let frequencyLemmaCount = 0;
  for (let startRow = 2; startRow <= 5477; startRow += 250) {
    const endRow = Math.min(5477, startRow + 249);
    const freqData = freqSheet.getRange(`A${startRow}:P${endRow}`).values;
    for (const row of freqData) {
    frequencyLemmaCount += 1;
    const lemma = String(row[0]);
    assert(!lemmaSet.has(lemma), `${phase}: duplicate frequency lemma found: ${lemma}`);
    lemmaSet.add(lemma);
    const total = asNumber(row[2]);
    frequencySum += total;
    assert(total <= previousFrequency, `${phase}: frequency sort order broken at ${row[0]}`);
    previousFrequency = total;

    const formCounts = [...String(row[1]).matchAll(/\((\d+)\)/g)].map((match) => Number(match[1]));
    if (formCounts.reduce((sum, count) => sum + count, 0) !== total) formFrequencyMismatchCount += 1;

    const articleRefs = splitList(row[9]);
    const uniqueArticleRefs = new Set(articleRefs);
    if (uniqueArticleRefs.size !== asNumber(row[3])) articleCountMismatchCount += 1;
    if ([...uniqueArticleRefs].some((id) => !ids.includes(id))) invalidArticleReferenceCount += 1;

    const years = splitList(row[8]);
    if (new Set(years).size !== asNumber(row[4])) yearCountMismatchCount += 1;
    if (years.length > 0) {
      assert(asNumber(row[6]) === Number(years[0]), `${phase}: first year mismatch for ${row[0]}`);
      assert(asNumber(row[7]) === Number(years[years.length - 1]), `${phase}: latest year mismatch for ${row[0]}`);
    }
    }
  }

  assert(frequencyLemmaCount === 5476, `${phase}: expected 5476 frequency lemmas, got ${frequencyLemmaCount}`);
  assert(frequencySum === overviewTokens, `${phase}: frequency sum ${frequencySum} != overview tokens ${overviewTokens}`);
  assert(formFrequencyMismatchCount === 0, `${phase}: ${formFrequencyMismatchCount} rows do not match actual-form counts`);
  assert(articleCountMismatchCount === 0, `${phase}: ${articleCountMismatchCount} rows have article-count mismatch`);
  assert(yearCountMismatchCount === 0, `${phase}: ${yearCountMismatchCount} rows have year-count mismatch`);
  assert(invalidArticleReferenceCount === 0, `${phase}: ${invalidArticleReferenceCount} rows reference invalid articles`);

  return {
    phase,
    sheetCount: sheetNames.length,
    sheetNames,
    articleCount: articles.length,
    yearRange: "2005–2025",
    patchedArticleTokens: asNumber(patched[4]),
    overviewTokens,
    frequencyLemmaCount,
    frequencySum,
    formulaCount,
    spreadsheetErrorCount: warnings.length,
    warnings,
  };
}

async function renderAll(workbook, directory, label) {
  await fs.mkdir(directory, { recursive: true });
  const outputs = [];
  for (let index = 0; index < expectedSheets.length; index += 1) {
    const sheetName = expectedSheets[index];
    console.log(`render ${label}: ${sheetName}`);
    const preview = await workbook.render({ sheetName, range: previewRanges[sheetName], format: "png", scale: 1 });
    const safeName = `${String(index + 1).padStart(2, "0")}-${sheetName}.png`;
    const destination = path.join(directory, safeName);
    await fs.writeFile(destination, new Uint8Array(await preview.arrayBuffer()));
    const stat = await fs.stat(destination);
    assert(stat.size > 0, `${label}: empty preview for ${sheetName}`);
    outputs.push({ sheetName, range: previewRanges[sheetName], path: destination, bytes: stat.size });
  }
  return outputs;
}

await fs.mkdir(outputDir, { recursive: true });
console.log("stage: import source");
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
console.log("stage: validate source");
const sourceValidation = await validateWorkbook(workbook, "source");
console.log("stage: render source");
const sourcePreviews = [];

console.log("stage: export");
const exported = await SpreadsheetFile.exportXlsx(workbook);
await exported.save(outputPath);

console.log("stage: import final");
const finalWorkbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
console.log("stage: validate final");
const finalValidation = await validateWorkbook(finalWorkbook, "final");
console.log("stage: render final");
const finalPreviews = [];
const stat = await fs.stat(outputPath);

const report = {
  sourcePath,
  outputPath,
  outputBytes: stat.size,
  sourceValidation,
  finalValidation,
  sourcePreviews,
  finalPreviews,
  warnings: [],
};
await fs.writeFile(path.join(outputDir, "validation-report.json"), JSON.stringify(report, null, 2), "utf8");
console.log(JSON.stringify(report, null, 2));
