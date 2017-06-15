var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/contact', { title: 'Contact' });
});
router.post('/send', function(req, res, next){
var transporter = nodemailer.createTransport({
	service:'Hotmail',
	auth: {
		user: 'hamiofficial@hotmail.com',
		pass: 'HamidJutt55'
	}
});
var mailOptions = {
	from : 'Hamid Raza <hamidraza@gmail.com',
	to: 'hamiofficial@gmail.com',
	subject : 'Website Submission',
	text : 'You have new submission with following details...Name:'+req.body.name+'Email'+req.body.email+'Message'+req.body.message,
	html: '<p> You got following submission with following details</p><ul><li>Name'+req.body.name+'</li><li>Email:'+req.body.email+'</li><li>Message'+req.body.message+'</li></ul>'

};
transporter.sendMail(mailOptions,function(error, info){
if (error){
	console.log(error);
	res.redirect('/');
}
else{
	console.log('Message Sent: '+info.response);
	res.redirect('/');
}
} );
});
module.exports = router;
