var router = require('express').Router();
var controllerSignUp = require('../controller/signUp.controller');
var controllerUserInfo = require('../controller/userInfo.controller');
var controllerLogin = require('../controller/login.controller');
var controllerNews = require('../controller/news.controller')

const upload = require('../lib/configFiles')


/*Registre*/
router.post('/post/user',controllerSignUp.addLogRegister);
router.post('/post/check/user',controllerSignUp.registerConfigurations);
router.post('/post/code', controllerSignUp.checkCodeClient);

/*Login*/
router.post('/post/login', upload.single('myFile'), controllerLogin.addLogLogin);

/*News*/
router.post('/post/news',controllerNews.addNews);
router.get('/get/news/:id');
// router.get('')

/*Users*/
router.post('/get/user', controllerUserInfo.getUserByNicknameEmail);


exports.router = router ;