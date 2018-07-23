var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wacky Crackups' });
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About' });
});

router.get('/blog', function(req, res, next) {
    res.render('blog', { title: 'Blog' });
});

module.exports = router;
