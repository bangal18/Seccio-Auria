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

exports.getNewsById = async function (req,res) {

	let data = await modelNews.getNewsById(req.params.id);
	res.send(data)
}


exports.getNextXNews = async function (req, res ) {
	let id = parseInt(req.params.index)
	let data = await modelNews.getNextXNews(id);
	res.send(data)

} 




