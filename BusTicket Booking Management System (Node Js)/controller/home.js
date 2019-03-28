var express = require('express');
var adminModel = require.main.require('./model/admin-model');
var router = express.Router();

router.get('*', function(req, res, next){
		if(req.session.adminname != null){
			next();
		}else{
			res.redirect('/adminlogin');
		}
});

router.get('/', (req, res)=>{
		res.render('home/index');
});	

//Show All Bus info
router.get('/userlist', (req, res)=>{
	
	adminModel.getuserlist(function(results){
		if(results.length > 0){
			var user = {
				name: req.session.name,
				uList: results
			};
			res.render('home/userlist', user);
		}
	});
});

//Bus info
router.get('/addbus', (req, res)=>{
	res.render('home/addbus');
});

//Add New Bus info
router.post('/addbus', (req, res)=>{
	var user={
		busname : req.body.busname,
		time : req.body.time,
		price: req.body.price,
		start:req.body.start,
		end:req.body.end
	};
	adminModel.add(user, function(success){
		if(success){
			res.redirect('/home/userlist');
		}else{
			res.render('home');
		}
	});
});








router.get('/update/:busid', (req, res)=>{
	adminModel.getdatabus(req.params.busid, function(result){
		if(result.length >0 ){
			res.render('home/update', result[0]);
		}else{
			res.redirect('/userlist');
		}
	});
});	

router.post('/update/:busid', (req, res)=>{
	var user ={
		busid: req.params.busid,
		busname : req.body.busname,
		time : req.body.time,
		price : req.body.price,
		start : req.body.start,
		end : req.body.end
	};
	adminModel.busupdate(user, function(success){
		if(success){
				res.redirect('/home/userlist');			
		}else{
			res.render("/home/update/"+req.params.busid);
		}
	});
});


router.get('/delete/:busid', (req, res)=>{
	adminModel.getdatabus(req.params.busid, function(result){
		if(result.length >0 ){
			res.render('home/delete', result[0]);
		}else{
			res.redirect('/sellerhome/buslist');
		}
	});
});


router.post('/delete/:busid', (req, res)=>{
	adminModel.busdelete(req.params.busid, function(success){
		if(success){
			res.redirect('/home/userlist');
		}else{
			res.redirect("/home/delete/"+req.params.busid);
		}
	});
});





//Get Select Bus info
//router.get('/update/:busid', (req, res)=>{
	//adminModel.getdata(req.params.busid, function(result){
		//if(result.length >0 ){
			//res.render('home/update', result[0]);
		//}else{
			//res.redirect('/home');
	//	}
	//});
//});	

//Update Select Bus info
//router.post('/update/:busid', (req, res)=>{
	//var user ={
		//busid: req.params.busid,
		//busname : req.body.busname,
	//	time : req.body.time,
	//	price : req.body.price,
	//	start : req.body.start,
	//	end : req.body.end
	//};
	//adminModel.postupdate(user, function(success){
	//	if(success){
			//	res.redirect('/home/userlist');
			
	//	}else{
		//	res.render("/home/update/"+req.params.busid);
	//	}
	//});
//});

//Get Select Bus info
//router.get('/delete/:busid', (req, res)=>{
	//adminModel.getdata(req.params.busid, function(result){
		//if(result.length >0 ){
	//		res.render('home/delete', result[0]);
	//	}else{
	//		res.redirect('/home/userlist');
	//	}
	//});
//});

//Select Bus info cancel
//router.post('/delete/:busid', (req, res)=>{
	//adminModel.delete(req.params.busid, function(success){
		//if(success){
		//	res.redirect('/home/userlist');
		//}else{
	//		res.redirect("/home/delete/"+req.params.busid);
	//	}
	//});
//});






//Show All Passenger info
router.get('/passlist', (req, res)=>{
	
	adminModel.getpasslist(function(results){
		if(results.length > 0){
			var user = {
				uList: results
			};
			res.render('home/passlist', user);
		}
	});	
});

//Show All seller info
router.get('/seller', (req, res)=>{
	adminModel.getsellerlist(function(results){
		if(results.length > 0){
			var user = {
				uList: results
			};
			res.render('home/seller', user);
		}
	});	
});

//Get Select Seller info
router.get('/sellerdelete/:sid', (req, res)=>{
	adminModel.getsellerdata(req.params.sid, function(result){
		if(result.length >0 ){
			res.render('home/sellerdelete', result[0]);
		}else{
			res.redirect('/home/seller');
		}
	});
});
//Select Seller info Delete
router.post('/sellerdelete/:sid', (req, res)=>{
	adminModel.deleteseller(req.params.sid, function(success){
		if(success){
			res.redirect('/home/seller');
		}else{
			res.redirect("/home/sellerdelete/"+req.params.sid);
		}
	});
});

//Get Select Ticket info
router.get('/passlistupdate/:tid', (req, res)=>{
	adminModel.getdata(req.params.tid, function(result){
		if(result.length >0 ){
			res.render('home/passlistupdate', result[0]);
		}else{
			res.redirect('/home/passlist');
		}
	});
});

//Select Ticket info update
router.post('/passlistupdate/:tid', (req, res)=>{
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
	adminModel.postupdate(user, function(success){
		if(success){
				res.redirect('/home/passlist');
			
		}else{
			res.render("/sellerhome/passlistupdate/"+req.params.tid);
		}
	});
});

//Get Select Ticket info
router.get('/passlistdelete/:tid', (req, res)=>{
	adminModel.getdata(req.params.tid, function(result){
		if(result.length >0 ){
			res.render('home/passlistdelete', result[0]);
		}else{
			res.redirect('/home/passlist');
		}
	});
});

//Select Ticket info cancel
router.post('/passlistdelete/:tid', (req, res)=>{
	adminModel.delete(req.params.tid, function(success){
		if(success){
			res.redirect('/home/passlist');
		}else{
			res.redirect("/home/passlistdelete/"+req.params.tid);
		}
	});
});

//Profile

router.get('/profile', (req, res)=>{

	adminModel.get(req.session.uid, function(result){

		if(result.length > 0){
			res.render('home/profile', result[0]);
		}
	});	
});





//Admin Logout
router.get('/logout', (req, res)=>{
	req.session.adminname = null;
	res.redirect('/adminlogin');

});



//router.post('/userlist',function(req,res){

	//adminModel.searchByName(req.body.busname, function(result){
		//if(result.length >0){
			//var user = {
				//uList: result
			//};
			//res.render('home/buslists', user);
	//	}
	//});	
//});


module.exports = router;