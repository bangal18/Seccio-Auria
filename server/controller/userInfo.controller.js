// const validator = require('validator');
const globalFunctions = require('../global/globalFunctions');
const modelUserInfo = require('../model/UserInfo.model');
const modelNotifications = require('../model/notifications.model');
const mail = require('../mail/mail');
const bcrypt = require("bcrypt");

exports.getUserByNicknameEmail = async function (req, res){
    let data = await modelUserInfo.getUserByNE(req.body.nickname, req.body.email);
    if(data.status){
        let code = globalFunctions.randomPassword();
        let bcryptCode =  await bcrypt.hash(code,10);
        
        await modelUserInfo.updatePassword(bcryptCode, data.result.id);
        mail.sendMail(req.body.email, `New password: ${code}`);
    } 
    res.send(data);
}

exports.getUserByNikname = async function (req,res) {
    let data = await modelUserInfo.getUserByNikname(req.params.username);
    res.send(data);
}

exports.getUserById = async function (req,res) {
    let data = await modelUserInfo.getUserById(req.params.id);
    res.send(data);
    
}

exports.getFollowers = async function (req, res) {
    let data = await modelUserInfo.getFollowers(req.params.id);
    res.send(data)
}

exports.getFollowing = async function (req, res) {
    let data = await modelUserInfo.getFollowing(req.params.id);
    // console.log(data)
    res.send(data)
}

exports.isFollowing = async function (req, res) {
    let data = await modelUserInfo.isFollowing(req.params.idCurrentUser, req.params.idUser);
    res.send(data)
}

exports.follow = async function (req, res) {
    let data = await modelUserInfo.follow(req.body.userId, req.body.followerId);
    await modelNotifications.setNewNotification(req.body.userId, req.body.followerId, 1, 0, null);
    res.send(data);
}

exports.unfollow = async function (req,res){
    let data = await modelUserInfo.unfollow(req.params.user_id, req.params.follower_id);
    await modelNotifications.removeNotification(req.params.user_id, req.params.follower_id, 1)
    res.send(data)
}

exports.updateUser = async function (req, res){
    let nicknameExists = await modelUserInfo.userExists(req.body.nickname);

    if(nicknameExists.data.length > 0){
      if(nicknameExists.data[0].nickname != req.body.oldNickname){
        res.send({staus : 0, message:"The nickname already exist."})
        return;
    }
}
let data = await modelUserInfo.updateUser(req.body);
res.send(data)
}

exports.getUsersSearch = async function (req, res) {
    let data = await modelUserInfo.getUsersSearch(req.params.nickname);
    res.send(data);
}


exports.getUserByTag = async function (req,res) {
    let data = await modelUserInfo.getUserByTag(req.params.tagId, req.params.index);
    console.log(req.params)
    // console.log(data)
    res.send(data);
}

exports.updatePassword = async function (req, res){
    let user = await modelUserInfo.getUserById(req.body.id);
    let compare = await bcrypt.compare(req.body.passwords.currentPassword,user.user.password);
    
    if(!compare){
        res.send({status : 0, message : 'Current password is incorrect'});
        return;
    }
    if(req.body.passwords.newPassword != req.body.passwords.confirmNewPassword){
        res.send({status : 0, message : 'Passwords are not the same'});
        return;
    }

    let password = await bcrypt.hash(req.body.passwords.newPassword,10);
    let data = await modelUserInfo.updatePassword(password, req.body.id)
    res.send({status: 1, message : 'Passwords changed successfully!'});
}

exports.changeStatus = async function(req, res){
    let data = await modelUserInfo.changeStatus(req.body.userId, req.body.status);
    res.send(data)
}