import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export async function applyJobs(keyword) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
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