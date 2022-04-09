
const validator = require('validator');
const globalFunctions = require('../global/globalFunctions');
const modelSignUp = require('../model/signUp.model');
const mail = require('../mail/mail');

exports.addLogRegister = function (req, res) {
  let params = [ 
    {param : ["nickname", req.body.nickname]},
    {param : ["name", req.body.name]}, 
    {param : ["email", req.body.email]},
    {param : ["password", req.body.password]},
    {param : ["confirmPassword", req.body.confirmPassword]}
  ]

  let data = globalFunctions.FILTER_SANITIZE_STRING(params);
  if(!data.code) {
    let code = globalFunctions.randomVerficateCode();
    mail.sendMail(code,req.body.email)

    data.verificationCode = code;
  }
  console.log(data);
  res.send(data)
}
