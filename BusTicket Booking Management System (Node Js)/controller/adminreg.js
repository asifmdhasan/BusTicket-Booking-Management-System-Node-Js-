var express = require('express');
var adminModel = require.main.require('./model/admin-model');
var router = express.Router();

router.get('/', (req, res)=>{
	res.render('adminreg');
});	

router.post('/', (req, res)=>{
	
	var user ={
		adminname : req.body.adminname,
		password : req.body.password,
		confirmpassword : req.body.confirmpassword,
		email : req.body.email,
		gender : req.body.gender
	};
	
	adminModel.inserted(user, function(success){
		if(success){
			res.redirect('/adminlogin');
		}else{
			res.render("adminreg/index");
		}
	});
});
module.exports = router;