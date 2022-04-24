// import {Request, Response} from 'express';
var req = require('express').Request;
var res = require('express').Response;

exports.createPhoto = function (req, res ) {
	res.send({status :1 , message : req.file.filename})
}

exports.getPhoto = function (req, res) {


}