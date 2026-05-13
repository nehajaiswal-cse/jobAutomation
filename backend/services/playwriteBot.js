import { chromium } from "playwright";

export async function applyJobs(keyword,resumePath) {
  const browser = await chromium.launch({
  headless: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox"
  ]
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