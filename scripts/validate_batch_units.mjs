import fs from "node:fs";
import vm from "node:vm";

const manifestText = fs.readFileSync("data/unit-manifest.js", "utf8");
for (const id of process.argv.slice(2)) {
  let unit;
  const context = { window: { UnitRegistry: { register(value) { unit = value; } } } };
  vm.createContext(context);
  const path = `data/${id.toLowerCase()}.js`;
  vm.runInContext(fs.readFileSync(path, "utf8"), context);
  const match = manifestText.match(new RegExp(`"${id}"\\s*:\\s*\\{[\\s\\S]*?"officialTargetWords"\\s*:\\s*\\[([\\s\\S]*?)\\]`));
  const official = [...match[1].matchAll(/"([^"]+)"/g)].map(item => item[1]);
  const actual = unit.vocabulary.map(item => item.word);
  const article = unit.paragraphs.map(item => item.en).join(" ");
  const report = {
    id,
    paragraphs: unit.paragraphs.length,
    wordCount: (article.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || []).length,
    vocabulary: actual.length,
    manifestExact: official.length === actual.length && official.every(word => actual.includes(word)),
    missingCoverage: unit.vocabulary.filter(item => ![item.word, ...(item.forms || [])].some(form => new RegExp(`\\b${form}\\b`, "i").test(article))).map(item => item.word),
    questions: unit.questions.length,
    uniqueAnswers: unit.questions.every(item => /^[A-D]$/.test(item.correctAnswer) && Object.keys(item.options).length === 4),
    sentences: unit.sentences.length,
    badSentences: unit.sentences.filter(item => !article.includes(item.original)).map(item => item.id),
    recallCards: unit.recallCards.length,
    reviewWords: unit.reviewWords.length,
    reviewExact: unit.reviewWords.length === 25 && actual.every(word => unit.reviewWords.some(item => item.word === word)),
    hasChinese: unit.paragraphs.every(item => Boolean(item.cn)),
    status: unit.status
  };
  console.log(JSON.stringify(report));
  if (report.wordCount < 450 || report.wordCount > 600 || report.vocabulary !== 25 || !report.manifestExact || report.missingCoverage.length || report.questions !== 4 || !report.uniqueAnswers || report.sentences < 2 || report.sentences > 3 || report.badSentences.length || report.recallCards !== 6 || !report.reviewExact || !report.hasChinese || report.status !== "official") process.exitCode = 1;
}
