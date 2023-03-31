const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const items = ["cup", "mens wallet", "backpack"];
const limitPerItem = 3;

async function scrapeAmazon() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    let counter = 0;
    await page.goto(`https://www.amazon.com/s?k=${item}`);

    const html = await page.content();
    const $ = cheerio.load(html);
    const results = $(".s-result-item");

    results.each((index, element) => {
      if (
        counter < limitPerItem &&
        $(element)
          .find(".a-size-medium.a-color-base.a-text-normal")
          .text()
          .toLowerCase()
          .includes(item)
      ) {
        const name = $(element)
          .find(".a-size-medium.a-color-base.a-text-normal")
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
  }

  await browser.close();
}

scrapeAmazon();
