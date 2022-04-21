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

}


// const imageStorage = multer.diskStorage({
//     // Destination to store image     
//     destination: 'images', 
//       filename: (req, file, cb) => {
//       cb(null, file.fieldname + '_' + Date.now() 
//          + path.extname(file.originalname))
//         // file.fieldname is name of the field (image)
//         // path.extname get the uploaded file extension
//     }
// });

