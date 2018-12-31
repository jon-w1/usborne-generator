var Promise = require("bluebird");
var request = require('request-promise');
var cheerio = require('cheerio');

const baseUrl = 'https://r7829.myubam.com';

function search(terms, category, callback) {

  Promise.map(terms, function(query) {
    return request(baseUrl + '/search?Q='+query+'&As=true&Cid='+category+'&Mid=0&Pf=&Pt=&Sid=true&btnsearch=Search').then(function(body) {
      const $ = cheerio.load(body);
      var bookElems = $('.search-results').find('.product-item');
      return bookElems.map(function(ind, elem) {
        return {
          title: $(this).find('.product-title a').text(),
          imgUrl: $(this).find('img').attr('src'),
          price: $(this).find('.UBAM-results-Price').first().text(),
          url: baseUrl + $(this).find('.product-title a').attr('href')
        };
      });
    });
  }).then(function(results) {
    console.log(results);

    var total = 4;
    var countPerTerm = total / results.length;

    var topPicks = [];
    for (var i = 0; i < results.length; i++) {
      for (var j = 0; j < countPerTerm; j++) {
        if (results[i].length > j) {
          topPicks.push(results[i][j]);
        }
      }
    }

    callback({
      count: topPicks.length,
      books: topPicks
    });
  }, function(err) {
    // handle all your errors here
  });
}

module.exports = {
  search: search
};
