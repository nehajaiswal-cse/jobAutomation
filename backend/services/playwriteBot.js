import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function applyJobs(keyword) {

  const browser = await puppeteer.launch({
    args: [
      ...chromium.args,
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
    executablePath: await chromium.executablePath(),
    headless: true,
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
  );

  await page.goto(
    `https://in.indeed.com/jobs?q=${encodeURIComponent(keyword)}`,
    {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    }
  );

  await new Promise(resolve =>
    setTimeout(resolve, 5000)
  );

  // NEW SELECTOR
  await page.waitForSelector("h2.jobTitle span", {
    timeout: 60000,
  });

  const jobs = await page.$$eval(
    "h2.jobTitle span",
    nodes =>
      nodes.slice(0, 5).map(n => ({
        title: n.innerText
      }))
  );

  console.log(jobs);

  await browser.close();

  return jobs;
}