var express = require('express');
var adminModel = require.main.require('./model/admin-model');
var router = express.Router();

router.get('/', (req,res)=>{
	res.render('adminlogin');
});

router.post('/',(req,res)=>{
	
	var user={
		adminname : req.body.adminname,
		password : req.body.password
	};
	adminModel.identity(user, function(result){
		if(result.length > 0){
			req.session.adminname = req.body.adminname;
			req.session.uid  = result[0].id;
			res.redirect('/home');
		}else{
			res.render("adminlogin/index");
		}
	});
});

module.exports = router;