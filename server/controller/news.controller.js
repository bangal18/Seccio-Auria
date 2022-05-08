const globalFunctions = require('../global/globalFunctions');
const modelNews = require('../model/news.model');
const jwt = require('jsonwebtoken');
const configToken = require('../config/auth');
const bcrypt = require("bcrypt");
const multer  = require('multer')

exports.addNews = async function (req, res) {
	//Validar inyección de codigo 
	let data = await modelNews.addNews(req.body)
	res.send(data)
}

exports.editNews = async function (req, res){
	let data = await modelNews.editNews(req.body);

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
	res.send(data)
}

exports.unlike = async function (req, res){
	let data = await modelNews.unlike(req.params.user_id, req.params.news_id);	
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



