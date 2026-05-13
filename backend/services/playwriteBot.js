import { chromium } from "playwright-core";

export async function applyJobs(keyword) {
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ]
  });

  const page = await browser.newPage();

  
  await page.goto(`https://in.indeed.com${keyword}`, {
    waitUntil: "domcontentloaded"
  });

  
  await page.click("button[type='submit']");

  await page.waitForSelector(".jobTitle", {
    timeout: 15000
  });

  const jobs = await page.$$eval(".jobTitle", nodes =>
    nodes.slice(0, 5).map(n => n.innerText.trim())
  );

  await browser.close();

  return jobs;
}