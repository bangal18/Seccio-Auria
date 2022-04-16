var router = require('express').Router();
var controllerSignUp = require('../controller/signUp.controller');
var controllerUserInfo = require('../controller/userInfo.controller');
var controllerLogin = require('../controller/login.controller');

/*Registre*/
router.post('/post/user',controllerSignUp.addLogRegister);
router.post('/post/check/user',controllerSignUp.registerConfigurations);
router.post('/post/code', controllerSignUp.checkCodeClient);


/*Login*/
router.post('/post/login', controllerLogin.addLogLogin);



router.post('/get/user', controllerUserInfo.getUserByNicknameEmail);


exports.router = router ;