var db = require('./db');

module.exports={


//LOGIN Check
	identity: function(user, callback){
		var sql = "select * from userreg where username=? and password=?";

		db.getResult(sql, [user.username, user.password], function(result){
			callback(result);
		});
	},
//REG INSERT
	inserted: function(user, callback){
		var sql = "insert into userreg values (null, ?,?,?,?,?)";
		db.execute(sql, [user.username, user.password, user.confirmpassword, user.email, user.gender], function(status){
			callback(status);
		});
	},
	
//ADD(BUS INSERT)
	addbusinfo: function(user, callback){
		var sql = "insert into userinfo values (null, ?,?,?,?)";
		db.execute(sql, [user.busname, user.time, user.start, user.end], function(status){
			callback(status);
		});
	},

//For combobox matching
	featchdata: function(user, callback){
		var sql = "select * from bus where start=? and end=?";

		db.getResult(sql, [user.start, user.end], function(result){
			callback(result);
		});
	},
	
		showdata: function(user, callback){
		var sql = "select * from bus where end=? and start=?";

		db.getResult(sql, [user.end, user.start], function(result){
			callback(result);
		});
	},
	
	addticketinfo: function(user, callback){
		var sql = "insert into ticketinfo values (?,?,?,?,?,?,?,?,?,null)";
		db.execute(sql, [user.busname, user.time, user.price, user.start, user.end, user.sii, user.name, user.phone, user.email], function(status){
			callback(status);
		});
	},
		getdatabus : function(busId, callback){
		//var sql = "select * from bus where busid="+busId;
		var sql = "select * from bus where busid=?";
		
		db.getResult(sql, [busId], function(result){
		//db.getResult(sql, function(result){
			callback(result);
		});
	},
	
}