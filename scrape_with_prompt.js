const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request");

async function scrapeAmazon() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Prompt for user input
  const searchQuery = "Thoughtful Wedding Gifts";
  const numItems = 2;

  // Add a random number or string to the search query
  // const randomString = Math.random().toString(36).substring(2, 8);
  // const query = `${searchQuery} ${randomString}`;

  await page.goto(`https://www.amazon.com/s?k=${searchQuery}`);

  const html = await page.content();
  const $ = cheerio.load(html);
  const results = $(".s-result-item");

  let counter = 0;
  const data = [];
  for (let i = 0; i < results.length && counter < numItems; i++) {
    const link = $(results[i]).find(".a-link-normal").attr("href");
    if (link) {
      await page.goto(`https://www.amazon.com/${link}`);
      const productHtml = await page.content();
      const $$ = cheerio.load(productHtml);
      const name = $$("h1").text().trim();
      const description = $$("div#productDescription").text().trim();
      const image = $$("div#imgTagWrapperId img").attr("src");

      if (image && /^https?:\/\//i.test(image)) {
        // Download image
        const imageName = `product${counter + 1}.jpg`;
        request(image).pipe(fs.createWriteStream(imageName));

        const productData = {
          name,
          description,
          image,
          productLink: `https://www.amazon.com/${link}`,
        };
        data.push(productData);

        console.log(productData);

        counter++;
      } else {
        console.log(`Invalid image URL: ${image}`);
      }
    }
  }

  // Save data to file
  const textData = JSON.stringify(data, null, 2);
  fs.writeFile("products.txt", textData, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Data saved to file");
  });

  await browser.close();
}

scrapeAmazon();
