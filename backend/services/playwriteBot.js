import { chromium } from "playwright-core";

export async function applyJobs(keyword) {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROMIUM_PATH,
  });

  const page = await browser.newPage();

 

  await page.goto(`https://in.indeed.com ${keyword}`);
  await page.click("button[type='submit']");

  await page.waitForTimeout(5000);

  const jobs = await page.$$eval(".jobTitle", nodes =>
    nodes.slice(0, 5).map(n => n.innerText)
  );

  await browser.close();
  return jobs;
}