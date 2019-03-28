var express = require('express');
var sellerModel = require.main.require('./model/seller-model');
var router = express.Router();

router.get('/', (req, res)=>{
	res.render('sellerreg');
});	

router.post('/', (req, res)=>{
	
	var user ={
		sellername : req.body.sellername,
		password : req.body.password,
		confirmpassword : req.body.confirmpassword,
		email : req.body.email,
		gender : req.body.gender
	};
	
	sellerModel.insert(user, function(success){
		if(success){
			res.redirect('/sellerlogin');
		}else{
			res.render("sellerreg/index");
		}
	});
});
module.exports = router;