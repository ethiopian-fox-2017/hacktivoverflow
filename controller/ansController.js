'use strict'
var express = require('express');
var router = express.Router();
var Answers = require('../models/jawaban');

let getAnswers = (req, res) => {

	// Skills.find(function (err, skills) {
 //  		if (err) return console.error(err);
 //  		res.send(skills);
	// })

	Answers.find()
	.populate('question', ['title', 'content'])
	.exec(function (err, instances) {
		if (err) res.send(err);
		else res.send(instances);
	})

	// Wisata.find()
 //  .populate('kota',['kota_id','kota_name'])
 //  .exec(function (err, instances) {
 //    if (err) res.send(err);
 //    else res.send(instances);
 //  })

}

let getOneAnswer = (req, res) => {

	Answers.findOne(
		{
			title: req.params.title 
		},
		function (err, title) {
  		if (err) res.send(err);
  		res.send(title);
		})

}

let createAnswers = (req, res) => {

	let answer = new Answers(
		{ 
			title: req.body.title, 
			content: req.body.content,
			question: req.body.question
		});

	answer.save(function (err) {
  	if (err) return console.error(err);
	});

	res.send(answer);

}

let delAnswers = (req, res) => {
	
	Answers.remove(
		{
			title: req.body.title
		},
		function(err) {
			if(err) res.send(err);
		}
	);

	res.send('Answer Removed!')
}

let updateAnswers = (req, res) => {

	Answers.findOneAndUpdate(
		{
			title: req.body.oldTitle
		},
		{
			title: req.body.title,
			content: req.body.content,
			question: req.body.question
		},
		function(err) {
			if(err) res.send(err);
		}
	);

	res.send('Quest updated')

}

module.exports = {
	getAnswers,
	getOneAnswer,
	createAnswers,
	delAnswers,
	updateAnswers
}