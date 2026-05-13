import { chromium } from "playwright";

export async function applyJobs(keyword) {
  const browser = await chromium.launch({
    headless: false
  });

  const page = await browser.newPage();

  await page.goto("https://in.indeed.com");

  await page.fill("input[name='q']", keyword);

  await page.click("button[type='submit']");

  await page.waitForTimeout(5000);

  const jobs = await page.$$eval(".jobTitle", nodes =>
    nodes.slice(0, 5).map(n => n.innerText)
  );

  await browser.close();

  return jobs;
}