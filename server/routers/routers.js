var router = require('express').Router();
var controllerSignUp = require('../controller/signUp.controller');
var controllerUserInfo = require('../controller/userInfo.controller');
var controllerLogin = require('../controller/login.controller');
var controllerNews = require('../controller/news.controller');
var controllerProfile = require('../controller/profile.controller')

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

/*Profile*/
router.get('/get/profile/:username', controllerUserInfo.getUserByNikname);
router.get('/get/followers/:id', controllerUserInfo.getFollowers)
router.get('/get/followings/:id',  controllerUserInfo.getFollowing);
router.get('/get/:username',controllerUserInfo.getUserByNikname);
router.get('/get/isFollowing/:idCurrentUser/:idUser', controllerUserInfo.isFollowing);
router.post('/post/follow/', controllerUserInfo.follow)
router.delete('/delete/unfollow/:user_id/:follower_id', controllerUserInfo.unfollow);


/*Settings*/
router.get('/get/settings/:id', controllerUserInfo.getUserById);
router.put('/put/settings/update', controllerUserInfo.updateUser)


/*Users*/
router.post('/get/user', controllerUserInfo.getUserByNicknameEmail);

exports.router = router ;