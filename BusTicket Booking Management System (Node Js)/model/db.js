var mysql = require('mysql');

var config = {
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'nodejs'
};
function getConnection(callback){
	connection = mysql.createConnection(config);
	connection.connect(function(err){
		if(err){
			console.log(err.stack);
		}
	});

	callback(connection);
}

module.exports= {
	getResult: function(sql, params, callback){		
		getConnection(function(connection){

			if(params == ""){
				connection.query(sql, function(err, result){				
				if(err){
						callback([]);
					}else{
						callback(result);
					}
				});
			}else{
				connection.query(sql, params, function(err, result){				
				if(err){
						callback([]);
					}else{
						callback(result);
					}
				});
			}
		});
	},
	execute: function(sql, params, callback){		
		getConnection(function(connection){

			if(params == ""){
				connection.query(sql, function(err, status){		
			
					if(err){
						callback(false);
					}else{
						callback(status);
					}
				});
			}else{
				connection.query(sql, params, function(err, status){		
			
					if(err){
						callback(false);
					}else{
						callback(status);
					}
				});
			}
		});
	}
}




