const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
    headless: true,
  }); 
  const page = await browser.newPage(); 

  await page.goto("https://fast.com");

  // Function to continuously retrieve and log changing text
  async function logChangingText() {
    try {
      const speedUnits = await page.$eval(
        "#speed-units",
        (element) => element.textContent
      ); 
      const speedValue = await page.$eval(
        "#speed-value",
        (element) => element.textContent
      ); 
      console.log(`Speed Units: ${speedUnits}, ⚡Speed Value: ${speedValue}🚀`); // Log the text
    } catch (error) {
      console.error("Error retrieving text:", error);
    }
  }

  setInterval(logChangingText, 5000);

  // Keep the browser open
  await new Promise(() => {});
})();
