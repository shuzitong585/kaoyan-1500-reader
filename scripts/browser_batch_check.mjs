import { chromium } from "file:///C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";

const browser = await chromium.launch({ headless: true, executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" });
const warmup = await browser.newPage();
await warmup.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
await warmup.close();
const requestedUnits = process.argv.slice(2);
for (const id of (requestedUnits.length ? requestedUnits : ["U04", "U05", "U06"])) {
  for (const viewport of [{ name: "desktop", width: 1280, height: 900 }, { name: "390px", width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport });
    const messages = [];
    page.on("console", message => { if (["error", "warning"].includes(message.type())) messages.push(`${message.type()}: ${message.text()}`); });
    page.on("pageerror", error => messages.push(`pageerror: ${error.message}`));
    await page.goto(`http://127.0.0.1:4173/?unit=${id}`, { waitUntil: "networkidle" });
    const layout = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    await page.screenshot({ path: `${id.toLowerCase()}-${viewport.name}.png`, fullPage: true });
    console.log(JSON.stringify({ id, viewport: viewport.name, ...layout, overflow: layout.scrollWidth > layout.clientWidth, messages }));
    await page.close();
  }
}
await browser.close();
