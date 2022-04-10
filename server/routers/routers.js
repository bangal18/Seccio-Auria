var router = require('express').Router();
var controllerSignUp = require('../controller/signUp.controller');

router.post('/post/user',controllerSignUp.addLogRegister);
router.post('/post/check/user',controllerSignUp.registerConfigurations);
router.post('/post/code', controllerSignUp.checkCodeClient);


exports.router = router ;