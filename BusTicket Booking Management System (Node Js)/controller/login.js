var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();

router.get('/', (req,res)=>{
	res.render('login');
});

router.post('/',(req,res)=>{
	
	var user={
		username : req.body.username,
		password : req.body.password
	};
	userModel.identity(user, function(result){
		if(result.length > 0){
			req.session.username = req.body.username;
			req.session.uid  = result[0].id;
			//set cookie
			//res.cookie('cookie1', 'first cookie');
			
			res.redirect('/userhome');
		}else{
			res.render("login/index");
		}
	});
});

module.exports = router;