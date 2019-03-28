var express = require('express');
var sellerModel = require.main.require('./model/seller-model');
var router = express.Router();

router.get('/', (req,res)=>{
	res.render('sellerlogin');
});

router.post('/',(req,res)=>{
	
	var user={
		sellername : req.body.sellername,
		password : req.body.password
	};
	sellerModel.identity(user, function(result){
		if(result.length > 0){
			req.session.sellername = req.body.sellername;
			req.session.sid  = result[0].sid;
			res.redirect('/sellerhome');
		}else{
			res.render("sellerlogin/index");
		}
	});
});

module.exports = router;