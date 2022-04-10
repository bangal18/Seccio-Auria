
const validator = require('validator');
const globalFunctions = require('../global/globalFunctions');
const modelSignUp = require('../model/signUp.model');
const mail = require('../mail/mail');
var code; 

exports.registerConfigurations = function (req, res) {
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
    mail.sendMail(code,req.body.email)
  }
  res.send(data)
}

exports.checkCodeClient = function(req,res) {
  if(req.body.code == code){
    res.send({status : 1, message : 'Valid Code'});
    return;
  }
  res.send({status : 0, message : 'Invalid Code'});
}

exports.addLogRegister = function(req, res) {
  modelSignUp.addUser(req.body)
}
