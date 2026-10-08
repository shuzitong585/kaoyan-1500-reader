import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const files = process.argv.slice(2);
for (const path of files) {
  console.log(`\n=== ${path} ===`);
  const input = await FileBlob.load(path);
  const workbook = await SpreadsheetFile.importXlsx(input);
  const sheets = await workbook.inspect({
    kind: "sheet",
    include: "id,name",
    maxChars: 12000,
  });
  console.log(sheets.ndjson ?? sheets);
  const matches = await workbook.inspect({
    kind: "match",
    searchTerm: "2019-T4|2019 T4|2019_T4|Tokens|Article|篇",
    options: { useRegex: true, maxResults: 200 },
    maxChars: 24000,
  });
  console.log(matches.ndjson ?? matches);
}
