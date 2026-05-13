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
      waitUntil: "networkidle2",
      timeout: 60000,
    }
  );

  // page title check
  const title = await page.title();
  console.log("PAGE TITLE:", title);

  // full HTML check
  const html = await page.content();

  console.log(html.slice(0, 3000));

  await browser.close();

  return [{ title }];
}