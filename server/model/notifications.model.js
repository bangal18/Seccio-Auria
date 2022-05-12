const connection = require('../config/db').connection;
const globalFunctions = require('../global/globalFunctions');

exports.setNewNotification = function (userId, userNotificationId ,type, isRead, newsId){
	try{
		let date = globalFunctions.getDateTypeSQL();
		let sql = "INSERT INTO notifications (id, user_id,user_notification_id,type_notification, is_read, news_id, creation_date) VALUES (?,?,?,?,?,?,?)";
		let values = [null, userId,userNotificationId,type, isRead, newsId, date];	

		return new Promise(function (resolve, reject) {

			connection.query(sql, values, function (err, result,fields){
				if(err){ console.log(err); resolve({staus : 0, message : "Error database"}); return;}
				resolve( { status: 1,lastId: result.insertId } );
			});
		})

	}catch(err){
		console.log(err);
	}
}

exports.removeNotification = function (userId, userNotificationId, type) {
	try{

		let sql = "DELETE FROM notifications WHERE user_id = ? AND user_notification_id = ? AND type_notification = ?";
		let values = [userId,userNotificationId,type];	

		return new Promise(function (resolve, reject) {

			connection.query(sql, values, function (err, result,fields){
				if(err){ console.log(err); resolve({staus : 0, message : "Error database"}); return;}
				resolve( { status: 1,lastId: result } );
			});
		})

	}catch(err){
		console.log(err);
	}

}

exports.getNotificationsById = function(id){
	try{

		let sql = "SELECT nw.main_cover, nw.id, u.nickname, u.name, u.photo, n.* FROM users AS u "+ 
		"INNER JOIN notifications AS n ON u.id = n.user_id " + 
		"LEFT JOIN news AS nw ON nw.id = n.news_id " + 
		"WHERE n.user_notification_id = ? ORDER BY n.id DESC;" 
		"" + 
		"";
		let values = [id];	

		return new Promise(function (resolve, reject) {

			connection.query(sql, values, function (err, result,fields){
				if(err){ console.log(err); resolve({staus : 0, message : "Error database"}); return;}
				resolve( { status: 1,result : result } );
			});
		})
	}catch(err){
		console.log(err);
	}
}

exports.notificationsViewed = function(id){
	try{
		let sql = "UPDATE notifications SET is_read = 1 WHERE user_notification_id = ?";
		let values = [id];
		return new Promise(function (resolve, reject) {

			connection.query(sql, values, function (err, result,fields){
				if(err){ console.log(err); resolve({staus : 0, message : "Error database"}); return;}
				resolve( { status: 1,result : result } );
			});
		})
	}catch(err){
		console.log(err);
	}

}