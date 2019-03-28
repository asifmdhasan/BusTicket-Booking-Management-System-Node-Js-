var express = require('express');
var userModel = require.main.require('./model/user-model');
var router = express.Router();

//check all validation
router.get('*', function(req, res, next){
		if(req.session.username != null){
			next();
		}else{
			res.redirect('/login');
		}
});



//get validation

router.get('/', (req, res)=>{
			var user = {
			username: req.session.username
		};
		res.render('userhome/index',user);
});


router.post('/', (req, res)=>{
		res.redirect('/userhome/showplace');
});

//show place
router.get('/showplace', (req, res)=>{
		res.render('userhome/showplace');
});




router.post('/showplace', (req, res)=>{
	var user={
	start : req.body.start,
	end : req.body.end
	};
	userModel.featchdata(user,function(results){
		if(results.length > 0){
			req.session.start = req.body.start,
			req.session.end = req.body.end
			res.redirect('/userhome/bus');
		}else{
			res.render('userhome/showplace');
		}
	});		
});

router.get('/bus', (req, res)=>{
	var user = {
		start : req.session.start,
		end: req.session.end
	};
	userModel.showdata(user,function(results){
		if(results.length > 0){
			
			//for(var i=0; i < results; i++){
				//req.session.busid=results[i].busid;
				//req.session.busname=results[i].busname;
				//req.session.time=results[i].time;
				//req.session.price=results[i].price;
			//}
			//req.session.busid  = results[0].busid;
			//req.session.busname= results[0].busname;
			//req.session.time = results[0].time;
			//req.session.price = results[0].price;
			var user = {
				uList: results
			};
			res.render('userhome/bus', user);
		}
	});
});


router.post('/bus', (req, res)=>{

		res.render('userhome/sit');
	});

	
router.get('/sit/:busid', (req, res)=>{
	
	userModel.getdatabus(req.params.busid, function(result){
		if(result.length >0 ){
			
			req.session.busid  = result[0].busid;
			req.session.busname= result[0].busname;
			req.session.time = result[0].time;
			req.session.price = result[0].price;
		var user ={
		busid: req.session.busid,
		busname : req.session.busname,
		time : req.session.time,
		price : req.session.price,
		start : req.session.start,
		end : req.session.end
	};
			
			
			res.render('userhome/sit', user);
		}
	});
});	


router.post('/sit/:busid', (req, res)=>{
		req.session.sii = req.body.sii;
		userModel.getdatabus(req.params.busid, function(result){
			
		if(result.length >0 ){
			req.session.busid  = result[0].busid;
			req.session.busname= result[0].busname;
			req.session.time = result[0].time;
			req.session.price = result[0].price;
		var user ={
		busid: req.session.busid,
		busname : req.session.busname,
		time : req.session.time,
		price : req.session.price,
		start : req.session.start,
		end : req.session.end,
		sii : req.session.sii
	};	
	res.redirect('/userhome/info');
		}
	});
});




router.get('/info', (req, res)=>{
		res.render('userhome/info');
});
router.post('/info', (req, res)=>{
		req.session.name = req.body.name;
		req.session.phone = req.body.phone;
		req.session.email = req.body.email;
		var user ={
		busid: req.session.busid,
		busname : req.session.busname,
		time : req.session.time,
		price : req.session.price,
		start : req.session.start,
		end : req.session.end,
		sii : req.session.sii,
		name : req.session.name,
		phone : req.session.phone,
		email : req.session.email
	};
	res.redirect('/userhome/print');
});


router.get('/print', (req, res)=>{
		var user ={
		busid: req.session.busid,
		busname : req.session.busname,
		time : req.session.time,
		price : req.session.price,
		start : req.session.start,
		end : req.session.end,
		sii : req.session.sii,
		name : req.session.name,
		phone : req.session.phone,
		email : req.session.email
	};
		res.render('userhome/print',user);
		
});

router.post('/print', (req, res)=>{
		var user ={
		busid: req.session.busid,
		busname : req.session.busname,
		time : req.session.time,
		price : req.session.price,
		start : req.session.start,
		end : req.session.end,
		sii : req.session.sii,
		name : req.session.name,
		phone : req.session.phone,
		email : req.session.email
	};
		userModel.addticketinfo(user,function(success){
		if(success){
			res.redirect('/userhome/lol');
		}
	});

});

router.get('/lol', (req, res)=>{
		res.render('userhome/lol');
});
module.exports = router;