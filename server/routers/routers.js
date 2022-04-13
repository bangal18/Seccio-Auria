var router = require('express').Router();
var controllerSignUp = require('../controller/signUp.controller');
var controllerUserInfo = require('../controller/userInfo.controller');

router.post('/post/user',controllerSignUp.addLogRegister);
router.post('/post/check/user',controllerSignUp.registerConfigurations);
router.post('/post/code', controllerSignUp.checkCodeClient);




router.post('/get/user', controllerUserInfo.getUserByNicknameEmail);


exports.router = router ;