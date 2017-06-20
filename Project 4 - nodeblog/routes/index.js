var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

// Homepage Blog Posts
router.get('/', function(req, res, next) {
  // res.render('pages/index', {title:"Home"})
  var db = req.db;
  var posts = db.get('posts');
  posts.find({},{},function(err, posts){
    if(err) console.log(err);

    // res.json(posts);
    res.render('pages/index', {title:"Home","posts":posts})
  });
});

module.exports = router;
