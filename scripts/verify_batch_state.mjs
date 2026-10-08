import { chromium } from "file:///C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";

const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const warmup = await context.newPage();
await warmup.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
await warmup.close();
const page = await context.newPage();
const messages = [];
page.on("console", message => { if (["error", "warning"].includes(message.type())) messages.push(`${message.type()}: ${message.text()}`); });
page.on("pageerror", error => messages.push(`pageerror: ${error.message}`));

async function goDirect(id) {
  await page.goto(`http://127.0.0.1:4173/?unit=${id}`, { waitUntil: "networkidle" });
}
async function openModule(id) {
  const toggle = page.locator(`[data-module-toggle="${id}"]`);
  if (await toggle.getAttribute("aria-expanded") !== "true") await toggle.click();
}
async function goBySelector(id) {
  await page.locator("[data-unit-selector-toggle]").click();
  await page.locator(`a[href="?unit=${id}"]`).click();
  await page.waitForLoadState("networkidle");
}
async function snapshot(id, questionId, reviewWord, sentenceId, expectedSecondPass) {
  await openModule("training");
  await openModule("sentences");
  await openModule("review");
  return {
    id: new URL(page.url()).searchParams.get("unit"),
    url: page.url(),
    questionDisabledOptions: await page.locator(`[data-question="${questionId}"] [data-answer][disabled]`).count(),
    questionFeedback: (await page.locator(`[data-question="${questionId}"]`).innerText()).includes("再想想") ? "retry" : "finished",
    sentenceOpen: await page.locator(`[data-sentence-toggle="${sentenceId}"]`).getAttribute("aria-expanded"),
    reviewStatus: await page.locator(`[data-review-target="${reviewWord}"][aria-pressed="true"]`).getAttribute("data-review-status").catch(() => null),
    secondPass: await page.locator('[data-control="reviewMode"]').getAttribute("aria-pressed"),
    expectedSecondPass
  };
}

await goDirect("U04");
await openModule("training");
await page.locator('[data-answer="B"][data-question-id="q1"]').click();
await openModule("sentences");
await page.locator('[data-sentence-toggle="s1"]').click();
await openModule("review");
await page.locator('[data-review-target="single"][data-review-status="known"]').click();
await page.locator('[data-control="reviewMode"]').click();

await goBySelector("U05");
await openModule("training");
await page.locator('[data-answer="A"][data-question-id="q1"]').click();
await openModule("sentences");
await page.locator('[data-sentence-toggle="s2"]').click();
await openModule("review");
await page.locator('[data-review-target="resource"][data-review-status="fuzzy"]').click();

await goBySelector("U06");
await openModule("training");
await page.locator('[data-answer="B"][data-question-id="q1"]').click();
await openModule("sentences");
await page.locator('[data-sentence-toggle="s3"]').click();
await openModule("review");
await page.locator('[data-review-target="democratic"][data-review-status="unknown"]').click();

await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForTimeout(600);
const u06Refresh = await snapshot("U06", "q1", "democratic", "s3", false);
await goBySelector("U04");
const u04 = await snapshot("U04", "q1", "single", "s1", true);
await goBySelector("U05");
const u05 = await snapshot("U05", "q1", "resource", "s2", false);
await goBySelector("U06");
const u06 = await snapshot("U06", "q1", "democratic", "s3", false);

await page.locator("[data-unit-selector-toggle]").click();
const selector = {
  u04: await page.locator('a[href="?unit=U04"]').count(),
  u05: await page.locator('a[href="?unit=U05"]').count(),
  u06: await page.locator('a[href="?unit=U06"]').count(),
  current: await page.locator('.unit-index-item.is-current').innerText(),
  u07Disabled: await page.locator('button[aria-label="U07 未开放"]').isDisabled()
};
console.log(JSON.stringify({ u04, u05, u06, u06Refresh, selector, messages }));
await browser.close();
