var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database:'portfolio'
});

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM Projects', function(err, rows, fields){
    if(err){
      console.log(err);
    } 
    res.render('index', {
        "rows":rows,
        title: 'Home'
        
      });
  });
  
});

module.exports = router;
