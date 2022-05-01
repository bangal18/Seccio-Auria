// const validator = require('validator');
const globalFunctions = require('../global/globalFunctions');
const modelUserInfo = require('../model/UserInfo.model');

exports.getUserByNicknameEmail = function (req, res){
    console.log(req.body)
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
    res.send(data)
}

exports.isFollowing = async function (req, res) {
    let data = await modelUserInfo.isFollowing(req.params.idCurrentUser, req.params.idUser);
    res.send(data)
}

exports.follow = async function (req, res) {
    let data = await modelUserInfo.follow(req.body.userId, req.body.followerId);
    res.send(data);
}

exports.unfollow = async function (req,res){
    console.log(req.params)
    let data = await modelUserInfo.unfollow(req.params.user_id, req.params.follower_id);
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
