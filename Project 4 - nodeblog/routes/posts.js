var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

var multer  = require('multer');
// var upload = multer({ dest: './public/images/uploads/' });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})

/* GET users listing. */
router.get('/show/:id', function(req, res, next){
var posts =  db.get('posts');
posts.findOne(req.params.id, function(err, post){
res.render('pages/show', {
      "title": req.params.id,
      "post": post
    });
});
});

router.get('/add', function(req, res, next) {
  var categories = db.get('categories');
  categories.find({},{},function(err, categories){

    res.render('pages/addpost', {
      title: "Add Post",
      "categories": categories
    });
  });


  // res.send('respond with a resource');
});

router.post('/add',upload.single('mainimage'),  function(req, res, next) {
  // get form values
  var title = req.body.title;
  var category = req.body.category;
  var body = req.body.body;
  var author = req.body.author;
  var date = new Date();
  var mainImageName="";
  console.log(req.file);
  if (req.file.filename) {

    var mainImageOriginalName = req.file.originalname;
      mainImageName = req.file.filename;
    var mainImageMime = req.file.mimetype;
    var mainImagePath = req.file.path;
    var mainImageExt = req.file.extention;
    var mainImageSize = req.file.size;
    console.log(mainImageName);
  } else {
      mainImageName = 'noimage.jpg';
  }
  // Form Validation
  req.checkBody('title', 'Title field is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();

  // Check Errors
  var errors = req.validationErrors();
  if (errors) {

    res.render('addpost', {
        "errors": errors,
        "title": title,
        "body": body
      })}
      else {

        var posts = db.get('posts')
        // Submit to db
        posts.insert({
          "title": title,
          "body": body,
          "category": category,
          "date": date,
          "author": author,
          "mainimage":mainImageName
        }, function(err, post) {
          if (err) {
            res.send('There is an issue in submitting the post.')
          } else {
            req.flash('success', 'Post Submitted!');
            res.location('/');
            res.redirect('/');
          }
        });
  }
});

router.post('/addcomment',upload.single('mainimage'),  function(req, res, next) {
  // get form values
  var name = req.body.name;
  var categoryemail = req.body.email;
  var body = req.body.body;
  var postid = req.body.postid;
  var commentdate = new Date();
  // Form Validation
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Valid Email is required').isEmail();
  req.checkBody('body', 'Body is required').notEmpty();
  // Check Errors
  var errors = req.validationErrors();
  if (errors) {
    var posts = db.get('posts');
    posts.findOne(postid, function(err, post){
              res.render('pages/show', {
              "errors": errors,
              "post": title
      });
    })
    }
      else {

       var comment = {
         "name": name,
         "email": "email",
         "body": body,
         "commentdate": commentdate
       };
       var posts = db.get('posts');
       posts.update({
                  "_id": postid,
                },{
                $push:{
                  "comments": comment,

                },
                function(err, doc) {
                  if(err) {
                    throw err;
                  }
                  else{
                    req.flash('success','Comment Added');
                    res.location('/posts/show/'+postid);
                    res.redirect('/posts/show/'+postid);
                  }
                }
                });
  }
});

module.exports = router;
