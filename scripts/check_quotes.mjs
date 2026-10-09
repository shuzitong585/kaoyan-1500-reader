// 语法预检辅助：逐行统计未转义双引号数量，奇数行 = 疑似漏收尾引号。
// 用法：node scripts/check_quotes.mjs data/uXX.js
// 退出码：0 = 全部成对；1 = 发现奇数行（同时打印行号与行首 60 字符）。
import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("usage: node scripts/check_quotes.mjs <file>");
  process.exit(2);
}
const lines = readFileSync(file, "utf8").split(/\r?\n/);
let bad = 0;
lines.forEach((line, i) => {
  // 统计未被反斜杠转义的双引号
  let count = 0;
  for (let j = 0; j < line.length; j++) {
    if (line[j] === '"' && (j === 0 || line[j - 1] !== "\\")) count++;
  }
  if (count % 2 === 1) {
    bad++;
    console.log(`LINE ${i + 1} (quotes=${count}): ${line.slice(0, 60)}`);
  }
});
if (bad > 0) {
  console.log(`FOUND ${bad} suspicious line(s)`);
  process.exit(1);
}
console.log("OK: all lines have paired quotes");
