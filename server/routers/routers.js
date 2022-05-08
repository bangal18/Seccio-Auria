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
router.post('/post/news/edit', controllerNews.editNews);
router.post('/uploads', multer.single('photo') ,photoController.createPhoto);
router.get('/get/newsByUserId/:userId', controllerNews.getNewsByUserId);
router.get('/get/getNextXNews/:index', controllerNews.getNextXNews);
router.get('/get/newsById/:id', controllerNews.getNewsById);
router.delete('/delete/news/:id', controllerNews.deleteNewsById);

/*Profile*/
router.get('/get/profile/:username', controllerUserInfo.getUserByNikname);
router.get('/get/followers/:id', controllerUserInfo.getFollowers)
router.get('/get/followings/:id',  controllerUserInfo.getFollowing);
router.get('/get/:username',controllerUserInfo.getUserByNikname);
router.get('/get/isFollowing/:idCurrentUser/:idUser', controllerUserInfo.isFollowing);
router.get('/get/search/:nickname', controllerUserInfo.getUsersSearch);
router.get('/get/searchByTag/:tagId/:index', controllerUserInfo.getUserByTag)
router.post('/post/follow/', controllerUserInfo.follow);
router.delete('/delete/unfollow/:user_id/:follower_id', controllerUserInfo.unfollow);

/*Inons*/
router.get('/get/isLiked/:user_id/:news_id', controllerNews.isLiked);
router.post('/post/like', controllerNews.like);
router.delete('/delete/unlike/:user_id/:news_id', controllerNews.unlike);

router.get('/get/isSaved/:user_id/:news_id', controllerNews.isSaved);
router.post('/post/save', controllerNews.save);
router.delete('/delete/unsave/:user_id/:news_id', controllerNews.unsave);



/*Settings*/
router.get('/get/settings/:id', controllerUserInfo.getUserById);
router.put('/put/settings/update', controllerUserInfo.updateUser)


/*Users*/
router.post('/get/user', controllerUserInfo.getUserByNicknameEmail);

exports.router = router ;