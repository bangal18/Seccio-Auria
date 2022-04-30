const globalFunctions = require('../global/globalFunctions');
const modelNews = require('../model/profile.model');
const jwt = require('jsonwebtoken');
const configToken = require('../config/auth');


exports.getProfile = async function (req,res) {

	let data = await modelNews.getProfile(req.params.username);
	console.log(data)

}
