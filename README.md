# amazon-web-scraper

This project contains two JavaScript files for scraping product information from Amazon using the Puppeteer and Cheerio libraries.

### scrape_with_product_names.js

This script searches for products on Amazon using a list of product names. It opens a headless browser using Puppeteer, navigates to the Amazon search results page for each product, and extracts the product name, description, image, and link using Cheerio. It then saves this information to a JSON file and downloads the product image to the local file system.

To use this script, edit the productNames array at the top of the file with your desired list of product names. Then, run the script with Node.js:

`node scrape_with_product_names.js`

### scrape_with_prompt.js

This script searches for products on Amazon using a user-specified prompt. It prompts the user to enter a search query and the number of products to scrape, and then performs a search on Amazon using Puppeteer and Cheerio. It extracts the same information as the previous script and saves it to a JSON file and downloads the product images to the local file system.

To use this script, run the script with Node.js:

`node scrape_with_prompt.js`

When prompted, enter your desired search query and the number of products to scrape.

Note: This script requires Node.js and the following libraries: Puppeteer, Cheerio, fs, and request. You can install these libraries using npm:

`npm install puppeteer cheerio fs request`
