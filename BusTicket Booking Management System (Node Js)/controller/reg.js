var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();

router.get('/', (req, res)=>{
	res.render('reg');
});	

router.post('/', (req, res)=>{
	
	var user ={
		username : req.body.username,
		password : req.body.password,
		confirmpassword : req.body.confirmpassword,
		email : req.body.email,
		gender : req.body.gender
	};
	
	userModel.inserted(user, function(success){
		if(success){
			res.redirect('/login');
		}else{
			res.render("reg/index");
		}
	});
});
module.exports = router;