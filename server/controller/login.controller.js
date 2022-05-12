const globalFunctions = require('../global/globalFunctions');
const modelUserInfo = require('../model/UserInfo.model');
const modelLogin = require('../model/login.model');
const jwt = require('jsonwebtoken');
const configToken = require('../config/auth');
const bcrypt = require("bcrypt");

exports.addLogLogin = async function (req,res){
	let filter = checkUser(req);
	if(!filter.status) { res.send(filter); return}
	
	let user = await modelUserInfo.getUserByNikname(filter.params.nickname);
	if(!user.status) { res.send(user); return}

	let compare = await bcrypt.compare(filter.params.password,user.user.password);
	if(!compare) { res.send({status : 0, message : "Invalid nickname or password"}); return;}
	
	const token = jwt.sign({
    	nickname : user.nickname, 
  	}, configToken.SECRET_TOKEN);

  	res.send({
  		status : 1, 
  		message : 'Succesfuly login', 
  		token : token,
  		user : {
  			id : user.user.id,
  			name : user.user.name,
  			nickname : user.user.nickname,
  			photo : user.user.photo,
  			email : user.user.email
  		},
  	});
}

exports.loginGoogle = async function (req,res){
	let data = await modelLogin.loginGoogle(req.body.email);
	if(!data.status){
		res.send(data);
		return;
	}
	const token = jwt.sign({
    	nickname : data.user.nickname, 
  	}, configToken.SECRET_TOKEN);
  	data['token'] = token;
	res.send(data);
}


function checkUser (req) {
	let params = [
		{param : ["nickname",req.body.nickname]},
		{param : ["password",req.body.password]}
	]
	return globalFunctions.FILTER_SANITIZE_STRING(params);

}