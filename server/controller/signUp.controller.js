
// const validator = require('validator');
const globalFunctions = require('../global/globalFunctions');
const modelSignUp = require('../model/signUp.model');
const modelUserInfo = require('../model/UserInfo.model');
const mail = require('../mail/mail');
const jwt = require('jsonwebtoken');
const configToken = require('../config/auth');
const bcrypt = require("bcrypt");
const modelNotifications = require('../model/notifications.model');

var user;
var code; 


exports.registerConfigurations = async function (req, res) {
  let params = [ 
    {param : ["nickname", req.body.nickname]},
    {param : ["name", req.body.name]}, 
    {param : ["email", req.body.email]},
    {param : ["password", req.body.password]},
    {param : ["confirmPassword", req.body.confirmPassword]}
  ]
  
  let data = globalFunctions.FILTER_SANITIZE_STRING(params);
  if (!data.status) {res.send(data); return;}
  
  let validation = await modelUserInfo.getUserByNicknameEmail(data.params.nickname, data.params.email);
  if (!validation.status) {res.send(validation); return;} 

  if(data.params.password != data.params.confirmPassword) {res.send({status:0, message: "No equals passwords"}); return;};
  
  data.params.password = await bcrypt.hash(data.params.password,10);
  code = globalFunctions.randomVerficateCode();
  user = data.params;
  user.photo = 'http://localhost:1000/uploads/default.jpg';

  mail.sendMail(data.params.email, `Code: ${code}`);
  res.send(validation);

}

exports.checkCodeClient = function(req,res) {
  if(req.body.code == code){
    res.send({status : 1, message : 'Valid Code'});
    return;
  }
  res.send({status : 0, message : 'Invalid Code'});
}

exports.addLogRegister = async function(req, res) {
  let data = await modelSignUp.addUser(user);

  const token = jwt.sign({
    nickname : user.nickname, 
  }, configToken.SECRET_TOKEN);
  
  user.id = data.lastId;
  res.send({
    status : 1, 
    message : 'Succesfuly registry', 
    data : data, 
    token : token, 
    user : user
  });
}

exports.signUpGoogle = async function (req, res){
  let user = req.body.user;
  user.nickname = user.nickname+"-"+globalFunctions.randomVerficateCode();
  
  let password = globalFunctions.randomPassword();
  user['password'] = password;
  user.password = await bcrypt.hash(user.password,10);
  

  const token = jwt.sign({
    nickname : user.nickname, 
  }, configToken.SECRET_TOKEN);
  

  let data = await modelSignUp.signUpGoogle(user);
  if(data.status){
    mail.sendMail(user.email, `Password: ${password}`);
    await modelNotifications.setNewNotification(38,data.lastId,4,0,null);
    user['id'] = data.lastId;
    data['token'] = token;
    data['user'] = user;
    res.send(data);
    return;
  } 
  res.send(data); 

}
