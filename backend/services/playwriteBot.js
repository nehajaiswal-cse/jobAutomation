import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function applyJobs(keyword,resumePath) {
const browser = await puppeteer.launch({
  args: chromium.args,
  executablePath: await chromium.executablePath(),
  headless: true,
});
  const page = await browser.newPage();

  // Example: Indeed (safe portal automation)
    await page.goto(
    `https://in.indeed.com/jobs?q=${keyword}`
  );
//  await page.setInputFiles(
//   'input[type="file"]',
//   resumePath
// );


  await page.waitForTimeout(Math.floor(Math.random() * 2000) + 1000);
  await page.waitForSelector(".jobTitle", { timeout: 60000 });

  const jobs = await page.$$eval(".jobTitle", nodes =>
    nodes.slice(0, 5).map(n => n.innerText)
  );

  await browser.close();
  return jobs;
}