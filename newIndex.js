const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

async function scrapeAmazon() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Prompt for user input
  const searchQuery = "10 unique birthday gifts for men";
  const numItems = 4;

  await page.goto(`https://www.amazon.com/s?k=${searchQuery}`);

  const html = await page.content();
  const $ = cheerio.load(html);
  const results = $(".s-result-item");

  let counter = 0;
  results.each((index, element) => {
    if (counter < numItems) {
      const name = $(element)
        .find(".a-size-base-plus.a-color-base.a-text-normal")
        .text();
      const description = $(element).find(".a-size-base").text();
      const image = $(element).find(".s-image").attr("src");
      const link = $(element).find(".a-link-normal").attr("href");

      console.log({
        name,
        description,
        image,
        link,
      });

      counter++;
    }
  });

  await browser.close();
}

scrapeAmazon();
