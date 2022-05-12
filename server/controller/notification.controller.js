const modelNotifications = require('../model/notifications.model');

exports.getNotificationsById = async function (req, res){
	let data = await modelNotifications.getNotificationsById(req.params.id);
	res.send(data);
}

exports.notificationsViewed = async function (req, res){
	let data = await modelNotifications.notificationsViewed(req.body.userId);
	res.send(data);
}