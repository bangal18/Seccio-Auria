var router = require('express').Router();
var controllerSignUp = require('../controller/signUp.controller');
var controllerUserInfo = require('../controller/userInfo.controller');
var controllerLogin = require('../controller/login.controller');
var controllerNews = require('../controller/news.controller')

const multer  = require('../libs/multer');

var photoController = require('../controller/photo.controller') 

/*Registre*/
router.post('/post/user',controllerSignUp.addLogRegister);
router.post('/post/check/user',controllerSignUp.registerConfigurations);
router.post('/post/code', controllerSignUp.checkCodeClient);

/*Login*/
router.post('/post/login', controllerLogin.addLogLogin);

/*News*/
router.post('/post/news', controllerNews.addNews);
router.post('/uploads', multer.single('photo') ,photoController.createPhoto)
router.get('/get/news/:id', controllerNews.getNewsById);
router.get('/get/getNextXNews/:index', controllerNews.getNextXNews)

/*Users*/
router.post('/get/user', controllerUserInfo.getUserByNicknameEmail);


exports.router = router ;