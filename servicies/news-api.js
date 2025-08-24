require("dotenv").config();

let newsTopHeadlines = document.getElementById("breaking-news-script");

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(`${process.env.API_KEY}`);
newsapi.v2
  .topHeadlines({
    q: "test",
    category: "technology",
    language: "en",
    country: "us",
  })
  .then((response) => {
    response.toJSON().then((data) => {
      let newsData = data.articles;
      newsTopHeadlines.map(function (article) {
        let div = document.createElement("news-article");
        div.innerHTML = `
        <img style="width: 100%; height: auto;" src="${article.urlToImage}" alt="${article.title}">
        <h2>${article.title}</h2><p>${article.description}</p>
        `;
        newsTopHeadlines.appendChild(div);
      });
    });
  })
  .catch((error) => console.error("Error:", error));

//  --------------------------------------------------------------
// fetch(
//   `https://newsapi.org/v2/top-headlines?country=us&category=technology&q=AI&apiKey=${process.env.API_KEY}`
// )
//   .then((response) => response.json())
//   .then((data) => newsTopHeadlines.push(data))
//   .catch((error) => console.error("Error:", error));

// console.log(newsTopHeadlines);
// let stringifiedHeadlines = JSON.stringify(newsTopHeadlines);
// console.log(stringifiedHeadlines);
