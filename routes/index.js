var express = require('express');
var BookService = require('../services/book');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../public/survey.html'));
});

router.get('/results', function(req, res, next) {
  var queries = req.query.q.split(",");
  var category = req.query.c;
  var name = req.query.n;
  if (name) {
    name += "'s";
  } else {
    name = "Your";
  }
  BookService.search(queries, category, function(list) {
    res.render('index', {
      name: name,
      list: list
    });
  });
});

module.exports = router;
