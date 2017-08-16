var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/portfolio/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage})

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database:'portfolio'
});

connection.connect();

/* GET home page. */
router.get('/',  function(req, res, next) {
  connection.query('SELECT * FROM Projects', function(err, rows, fields){
    if(err){
      console.log(err);
    } 
    res.render('dashboard', {
        "rows":rows,
        title: 'Dashboard',
        layout:'layout2.hbs'
      });
  });
  
});

router.get('/new', function(req, res, next){
res.render('new',{
  title:'Add Project',
  layout:'layout2'
});
});

router.post('/new',upload.single('projectimage'), function(req, res, next){
var title = req.body.title,
    description = req.body.description,
    service = req.body.service,
    client = req.body.client,
    projectdate = req.body.projectdate;
    console.log(req.file.filename)
    // Check Image
if(req.file.filename){
  var projectImageOriginalName = req.file.originalname,
      projectImageName = req.file.filename,
      projectImageMime = req.file.mimetype,
      projectImagePath = req.file.path,
      projectImageExt = req.file.extension,
      projectImageSize = req.file.size;

      console.log(projectImageName);
      
}
    else {
      var projectImageName = 'noimage.png';
      
    }

    // Form Validation
    req.checkBody('title', 'Title field is required').notEmpty();
    req.checkBody('service','Service field is required').notEmpty();
    var errors = req.validationErrors();

    if(errors){
      res.render('new',{
      errors: errors,
      title: title,
      description: description,
      client: client,
      layout:'layout2'
      });
  
      console.log('Hello');
    } else{
      var project = {
        title: title,
        description: description,
        service:service,
        client: client,
        date: projectdate,
        image: projectImageName
      };
      console.log('Hello1');
      var query = connection.query('INSERT INTO projects SET ?', project, function(err, result){
        // Project Inserted
      });
      req.flash('success', 'Project Inserted');
      res.redirect('/admin');
   

    }
});
  router.get('/edit/:id',  function(req, res, next) {
  connection.query('SELECT * FROM Projects WHERE id='+req.params.id, function(err, row, fields){
    if(err){
      console.log(err);
    } 
    res.render('edit', {
        "row":row[0],
        title: 'edit',
        layout:'layout2'
      });
  });
  
});


router.post('/edit/:id',upload.single('projectimage'), function(req, res, next){
var title = req.body.title,
    description = req.body.description,
    service = req.body.service,
    client = req.body.client,
    projectdate = req.body.projectdate;
    console.log(req.file)
    // Check Image
if(req.file.projectimage){
  var projectImageOriginalName = req.file.projectimage.originalname,
      projectImageName = req.file.projectimage.name,
      projectImageMime = req.file.projectimage.mime,
      projectImagePath = req.file.projectimage.path,
      projectImageExt = req.file.projectimage.extension,
      projectImageSize = req.file.projectimage.size;
      
}
    else {
      var projectImageName = 'noimage.png';
      
    }

    // Form Validation
    req.checkBody('title', 'Title field is required').notEmpty();
    req.checkBody('service','Service field is required').notEmpty();
    var errors = req.validationErrors();

    if(errors){
      res.render('new',{
      errors: errors,
      title: title,
      description: description,
      client: client,
      layout:'layout2'
      });
  
      console.log('Hello');
    } else{
      var project = {
        title: title,
        description: description,
        service:service,
        client: client,
        date: projectdate,
        image: projectImageName
      };
      console.log('Hello1');
      var query = connection.query('UPDATE projects SET ? WHERE id='+req.params.id, project, function(err, result){
        // Project Inserted
      });
      req.flash('success', 'Project Updated');
      res.redirect('/admin');
   

    }
});

router.delete('/delete/:id', function(req, res){
  console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
   console.log(req.params.id)
  connection.query('DELETE FROM projects WHERE id='+req.params.id, function(err, result){
    if(err) throw err;
    req.flash('success', 'Project Deleted');
      res.redirect('/admin');
  })
})

module.exports = router;
