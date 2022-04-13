
// const validator = require('validator');
const globalFunctions = require('../global/globalFunctions');
const modelSignUp = require('../model/signUp.model');
const modelUserInfo = require('../model/UserInfo.model');
const mail = require('../mail/mail');
const jwt = require('jsonwebtoken');
const configToken = require('../config/auth')
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
  if(!data.code) {
    code = globalFunctions.randomVerficateCode();
    //mail.sendMail(code,req.body.email)
    let result = await modelUserInfo.getUserByNicknameEmail(data.params.nickname, data.params.email,(data)=>{
      console.log(data)
    })
   
  }
  
  //res.send(data)
}

exports.checkCodeClient = function(req,res) {
  if(req.body.code == code){
    res.status(200).send({status : 1, message : 'Valid Code'});
    return;
  }
  res.status(404).send({status : 0, message : 'Invalid Code'});
}

exports.addLogRegister = async function(req, res) {
  let data = await modelSignUp.addUser(req.body);

  const token = jwt.sign({
    name : req.body.name, 
    email : req.body.email
  }, configToken.SECRET_TOKEN);
  
  res.status(201).send({status : 1, message : 'Succesfuly registry', data : data, token : token});
}
