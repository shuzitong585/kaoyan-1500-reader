import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const source = process.argv[2];
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(source));

for (const [sheetName, range] of [
  ["总览", "A1:E11"],
  ["84篇对账", "A1:H85"],
  ["正式词频母表", "A1:P12"],
  ["规则与说明", "A1:B16"],
]) {
  const result = await workbook.inspect({ kind: "region", sheetId: sheetName, range, maxChars: 30000, tableMaxRows: 100, tableMaxCols: 20, tableMaxCellChars: 800 });
  console.log(`\n=== ${sheetName}!${range} ===`);
  console.log(result.ndjson ?? result);
}

const formulas = await workbook.inspect({ kind: "formula", maxChars: 12000, options: { maxResults: 500 } });
console.log("\n=== FORMULAS ===");
console.log(formulas.ndjson ?? formulas);

const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#VALUE!|#DIV/0!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 500 }, maxChars: 12000 });
console.log("\n=== ERRORS ===");
console.log(errors.ndjson ?? errors);

console.log("\n=== RENDER HELP ===");
console.log(workbook.help("workbook.render", { include: "index,examples,notes", maxChars: 5000 }).ndjson);
