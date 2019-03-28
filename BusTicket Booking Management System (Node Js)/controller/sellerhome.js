var express = require('express');
var sellerModel = require.main.require('./model/seller-model');
var router = express.Router();

router.get('*', function(req, res, next){
		if(req.session.sellername != null){
			next();
		}else{
			res.redirect('/sellerlogin');
		}
});
router.get('/', (req, res)=>{
			var user = {
			sellername: req.session.sellername
		};
		res.render('sellerhome/index',user);
});
router.get('/passlist', (req, res)=>{
	
	sellerModel.getuserlist(function(results){
		if(results.length > 0){
			var user = {
				//name: req.session.name,
				uList: results
			};
			res.render('sellerhome/passlist', user);
		}
	});	
});

router.get('/update/:tid', (req, res)=>{
	sellerModel.getdata(req.params.tid, function(result){
		if(result.length >0 ){
			res.render('sellerhome/update', result[0]);
		}else{
			res.redirect('/sellerhome');
		}
	});
});


router.post('/update/:tid', (req, res)=>{
	var user ={
		tid: req.params.tid,
		busname : req.body.busname,
		time : req.body.time,
		price : req.body.price,
		start : req.body.start,
		end : req.body.end,
		sii : req.body.sii,
		name : req.body.name,
		phone : req.body.phone,
		email : req.body.email
	};
	sellerModel.postupdate(user, function(success){
		if(success){
				res.redirect('/sellerhome/passlist');
			
		}else{
			res.render("/sellerhome/update/"+req.params.tid);
		}
	});
});

router.get('/delete/:tid', (req, res)=>{
	sellerModel.getdata(req.params.tid, function(result){
		if(result.length >0 ){
			res.render('sellerhome/delete', result[0]);
		}else{
			res.redirect('/sellerhome/passlist');
		}
	});
});

router.post('/delete/:tid', (req, res)=>{
	sellerModel.delete(req.params.tid, function(success){
		if(success){
			res.redirect('/sellerhome/passlist');
		}else{
			res.redirect("/sellerhome/delete/"+req.params.tid);
		}
	});
});




router.get('/addbus', (req, res)=>{
	res.render('sellerhome/addbus');
});

router.post('/addbus', (req, res)=>{
	var user={
		busname : req.body.busname,
		time : req.body.time,
		price: req.body.price,
		start:req.body.start,
		end:req.body.end
	};
	sellerModel.add(user, function(success){
		if(success){
			res.redirect('/sellerhome/buslist');
		}else{
			res.render('sellerhome');
		}
	});
});




router.get('/buslist', (req, res)=>{
	
	sellerModel.getbuslist(function(results){
		if(results.length > 0){
			var user = {
				uList: results
			};
			res.render('sellerhome/buslist', user);
		}
	});	
});


router.get('/busupdate/:busid', (req, res)=>{
	sellerModel.getdatabus(req.params.busid, function(result){
		if(result.length >0 ){
			res.render('sellerhome/busupdate', result[0]);
		}else{
			res.redirect('/sellerhome');
		}
	});
});	

router.post('/busupdate/:busid', (req, res)=>{
	var user ={
		busid: req.params.busid,
		busname : req.body.busname,
		time : req.body.time,
		price : req.body.price,
		start : req.body.start,
		end : req.body.end
	};
	sellerModel.busupdate(user, function(success){
		if(success){
				res.redirect('/sellerhome/buslist');
			
		}else{
			res.render("/sellerhome/busupdate/"+req.params.busid);
		}
	});
});

router.get('/busdelete/:busid', (req, res)=>{
	sellerModel.getdatabus(req.params.busid, function(result){
		if(result.length >0 ){
			res.render('sellerhome/busdelete', result[0]);
		}else{
			res.redirect('/sellerhome/buslist');
		}
	});
});

router.post('/busdelete/:busid', (req, res)=>{
	sellerModel.busdelete(req.params.busid, function(success){
		if(success){
			res.redirect('/sellerhome/buslist');
		}else{
			res.redirect("/sellerhome/busdelete/"+req.params.busid);
		}
	});
});


router.get('/profile', (req, res)=>{

	sellerModel.get(req.session.sid, function(result){

		if(result.length > 0){
			res.render('sellerhome/profile', result[0]);
		}
	});	
});

router.get('/logout', (req, res)=>{
	req.session.sellername = null;
	res.redirect('/sellerlogin');

});



module.exports = router;