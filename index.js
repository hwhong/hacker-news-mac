const axios = require("axios");
const cheerio = require("cheerio");
const bitbar = require("bitbar");

const url = "https://news.ycombinator.com/";
axios
  .get(url)
  .then((response) => {
    console.log(response.data);
    getData(response.data);
  })
  .catch((error) => console.log(error));

const getData = (html) => {
  data = [];
  const $ = cheerio.load(html);
  $("table.itemlist tr td:nth-child(3)").each((i, elem) => {
    data.push({
      text: $(elem).text(),
      link: $(elem).find("a.storylink").attr("href"),
    });
  });
  init(data);
};

async function init(data) {
  return bitbar.create(data);
}
