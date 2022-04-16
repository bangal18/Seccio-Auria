const globalFunctions = require('../global/globalFunctions');
const modelUserInfo = require('../model/UserInfo.model');
const jwt = require('jsonwebtoken');
const configToken = require('../config/auth');
const bcrypt = require("bcrypt");

exports.addLogLogin = async function (req,res){
	let filter = checkUser(req);
	if(!filter.status) { res.send(filter); return}
	
	let user = await modelUserInfo.getUserByNikname(filter.params.nickname);
	if(!user.status) { res.send(user.message); return}

	let compare = await bcrypt.compare(filter.params.password,user.user.password);
	if(!compare) { res.send({status : 0, message : "Invalid nickname or password"}); return;}
	
	const token = jwt.sign({
    	nickname : user.nickname, 
  	}, configToken.SECRET_TOKEN);
  
  	res.send({status : 1, message : 'Succesfuly login', token : token});
}


function checkUser (req) {
	let params = [
		{param : ["nickname",req.body.nickname]},
		{param : ["password",req.body.password]}
	]
	return globalFunctions.FILTER_SANITIZE_STRING(params);

}