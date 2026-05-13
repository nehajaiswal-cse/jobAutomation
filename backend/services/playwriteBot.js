import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function applyJobs(keyword,resumePath) {
const browser = await puppeteer.launch({
   args: [
      ...chromium.args,
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  defaultViewport: chromium.defaultViewport,  
  executablePath: await chromium.executablePath(),
  headless: chromium.headless,
});await page.waitForSelector("h2.jobTitle span", {
  timeout: 60000,
});

const jobs = await page.$$eval(
  "h2.jobTitle span",
  nodes =>
    nodes.slice(0, 5).map(n => ({
      title: n.innerText
    }))
);
  const page = await browser.newPage();

  // Example: Indeed (safe portal automation)
    await page.goto(
    `https://in.indeed.com/jobs?q=${keyword}`,
     {
      waitUntil: "networkidle2",
      timeout: 60000,
    }
  );


  await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 2000) + 1000));
  await page.waitForSelector(".jobTitle", { timeout: 60000 });

  const jobs = await page.$$eval(".jobTitle", nodes =>
    nodes.slice(0, 5).map(n => n.innerText)
  );

  await browser.close();
  return jobs;
}