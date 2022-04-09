var router = require('express').Router();
var controllerSignUp = require('../controller/signUp.controller')


router.get('/news')
router.post('/post/user',controllerSignUp.addLogRegister)
exports.router = router ;