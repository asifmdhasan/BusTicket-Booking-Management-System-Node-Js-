var db = require('./db');

module.exports={


//LOGIN Check
	identity: function(user, callback){
		var sql = "select * from adminreg where adminname=? and password=?";

		db.getResult(sql, [user.adminname, user.password], function(result){
			callback(result);
		});
	},
//REG INSERT
	inserted: function(user, callback){
		//var sql = "insert into userreg values ('"+user.username+"','"+user.password+"','"+user.confirmpassword+"','"+user.email+"','"+user.gender+"')";
		var sql = "insert into adminreg values (null, ?,?,?,?,?)";
		db.execute(sql, [user.adminname, user.password, user.confirmpassword, user.email, user.gender], function(status){

		//db.getResult(sql, function(result){
		callback(status);
		});
	},
	
//ADD(BUS INSERT)
	add: function(user, callback){
		//var sql = "insert into bus values (null, '"+user.busname+"','"+user.time+"','"+user.start+"','"+user.end+"')";
		var sql = "insert into bus values (null, ?,?,?,?,?)";

		//db.execute(sql, function(status){
		db.execute(sql, [user.busname, user.time,user.price, user.start, user.end], function(status){
			callback(status);
		});
	},
	
//SHOW ALL Table Info
	getuserlist: function(callback){
		var sql = "select * from bus";

		db.getResult(sql, [], function(result){
			callback(result);
		});
	},
	
	
	getpasslist: function(callback){
		var sql = "select * from ticketinfo";

		db.getResult(sql, [], function(result){
			callback(result);
		});
	},

	
	
	
//Using Id Get Bus Data
	getdatabus : function(busId, callback){
		//var sql = "select * from bus where busid="+busId;
		var sql = "select * from bus where busid=?";
		
		db.getResult(sql, [busId], function(result){
		//db.getResult(sql, function(result){
			callback(result);
		});
	},
	
	
	
//UPDATE Bus
	busupdate:function(user, callback){
		//var sql = "update bus set busname='"+user.busname+"',time='"+user.time+"', start='"+user.start+"', end ='"+user.end+"'where busid="+user.busid;
		var sql = "update bus set busname=?,time=?,price=?, start=?, end=? where busid=?";

		
		//db.execute(sql, function(status){
		db.execute(sql, [user.busname, user.time, user.price, user.start,user.end, user.busid], function(status){
			callback(status);
		});
	},
	
	
//DELETE Bus
	busdelete: function(busId, callback){
		//var sql = "delete from bus where busid=?";
		var sql = "delete from bus where busid=?";

		//db.execute(sql, function(status){
		db.execute(sql, [busId], function(status){
			callback(status);
		});
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

//Using Id Get Data
	//getdata : function(busId, callback){
		//var sql = "select * from bus where busid=?";
		
	//	db.getResult(sql, [busId], function(result){
		//	callback(result);
	//	});
	//},
//UPDATE
	//postupdate:function(user, callback){
		//var sql = "update bus set busname='"+user.busname+"',time='"+user.time+"', start='"+user.start+"', end ='"+user.end+"'where busid="+user.busid;
	//	var sql = "update bus set busname=?,time=?,price=?, start=?, end=? where busid=?";

		
		//db.execute(sql, function(status){
		//db.execute(sql, [user.busname, user.time, user.price, user.start,user.end, user.busid], function(status){
		//	callback(status);
		//});
	//},
//DELETE
	//delete: function(busId, callback){
		//var sql = "delete from bus where busid=?";
	//	var sql = "delete from bus where busid=?";

		//db.execute(sql, function(status){
		//db.execute(sql, [busId], function(status){
		//	callback(status);
		//});
	//},
	
	//Seller data
		getsellerlist: function(callback){
		var sql = "select * from sellerreg";

		db.getResult(sql, [], function(result){
			callback(result);
		});
	},
	
//Seller data for delete
	getsellerdata : function(sId, callback){
		//var sql = "select * from bus where busid="+busId;
		var sql = "select * from sellerreg where sid=?";
		
		db.getResult(sql, [sId], function(result){
		//db.getResult(sql, function(result){
			callback(result);
		});
	},
//DELETE
	deleteseller: function(sId, callback){
		//var sql = "delete from bus where busid=?";
		var sql = "delete from sellerreg where sid=?";

		//db.execute(sql, function(status){
		db.execute(sql, [sId], function(status){
			callback(status);
		});
	},

	//Using Id Get Data
	getdata : function(tId, callback){
		var sql = "select * from ticketinfo where tid=?";
		
		db.getResult(sql, [tId], function(result){
			callback(result);
		});
	},
//UPDATE
	postupdate:function(user, callback){
		var sql = "update ticketinfo set busname=?,time=?,price=?, start=?, end=? ,sii=?,name=?, phone=?, email=? where tid=?";
		
		db.execute(sql, [user.busname, user.time, user.price, user.start,user.end,user.sii, user.name, user.phone,user.email,user.tid], function(status){
			callback(status);
		});
	},
//DELETE
	delete: function(tId, callback){
		var sql = "delete from ticketinfo where tid=?";

		db.execute(sql, [tId], function(status){
			callback(status);
		});
	},
	
	
	
//Profile
		get: function(sId, callback){
		var sql = "select * from adminreg where id=?";

		db.getResult(sql, [sId], function(result){
			callback(result);
		});
	},
	
//Search by name
	searchByName:function(busname,callback){
        var sql="select * from bus where busname=%?"; 
		
		//$sql = "select username from user where username like '".$key."%'";

		//$sql = "select * from productentry where name like '".$name."%'";
		//var sql="SELECT * from employees WHERE username=?";
		
		db.getResult(sql,[busname],function(result){
			callback(result);
		});
	},

	
	
	
	
	
}