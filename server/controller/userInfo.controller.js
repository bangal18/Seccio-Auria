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

exports.getFollowers = async function (req, res) {
    let data = await modelUserInfo.getFollowers(req.params.id);
    res.send(data)
}

exports.getFollowing = async function (req, res) {
    let data = await modelUserInfo.getFollowing(req.params.id);
    res.send(data)

}
