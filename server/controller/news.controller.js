const globalFunctions = require('../global/globalFunctions');
const modelNews = require('../model/news.model');
const jwt = require('jsonwebtoken');
const configToken = require('../config/auth');
const modelNotifications = require('../model/notifications.model');
const bcrypt = require("bcrypt");
const multer  = require('multer');
const apiController = require('./api.controller');

/**API PETITIONS**/
var mediastackAPI;
var newsapiAPI;
(async function () {
	mediastackAPI = await apiController.mediastack();
	newsapiAPI = await apiController.newsapi();
}())
/****/

exports.addNews = async function (req, res) {
	//Validar inyección de codigo 
	let data = await modelNews.addNews(req.body)
	res.send(data)
}

exports.editNews = async function (req, res){
	let data = await modelNews.editNews(req.body);
	// console.log(data)
	res.send(data);
}

exports.getNewsByUserId = async function (req,res) {
	let data = await modelNews.getNewsByUserId(req.params.userId);
	res.send(data)
}

exports.getNewsById = async function (req,res) {
	let data = await modelNews.getNewsById(req.params.id);
	res.send(data)
}


exports.getNextXNews = async function (req, res ) {
	let id = parseInt(req.params.index)
	let data = await modelNews.getNextXNews(id);
	if(data.content.length == 0) data = {status : 2, newsAPI : newsapiAPI.articles, mediastackAPI : mediastackAPI.data}	
	res.send(data)
}

exports.save = async function (req, res){
	let data = await modelNews.save(req.body.userId, req.body.newsId);	
	res.send(data)
}

exports.unsave = async function (req, res){
	let data = await modelNews.unsave(req.params.user_id, req.params.news_id);
	res.send(data)
}

exports.isSaved = async function (req, res){
	let data = await modelNews.isSaved(req.params.user_id, req.params.news_id);
	res.send(data)
}

exports.like = async function (req, res){
	let data = await modelNews.like(req.body.userId, req.body.newsId);
	await modelNotifications.setNewNotification(req.body.userId, req.body.newsUserId, 3, 0, req.body.newsId);	
	res.send(data)
}

exports.unlike = async function (req, res){
	let data = await modelNews.unlike(req.params.user_id, req.params.news_id);
	await modelNotifications.removeNotification(req.params.user_id, req.params.news_user_id, 3);	
	res.send(data)
}

exports.isLiked = async function (req, res){
	let data = await modelNews.isLiked(req.params.user_id, req.params.news_id);
	res.send(data)
}

exports.deleteNewsById = async function (req, res){
	let data = await modelNews.deleteNewsById(req.params.id);
	res.send(data);
}

exports.getSavesNews = async function (req,res){
	let data = await modelNews.getSavesNews(req.params.user_id);
	res.send(data);
}



