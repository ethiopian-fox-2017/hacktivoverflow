'use strict'
var express = require('express');
var router = express.Router();
var Quests = require('../models/pertanyaan');

let getQuests = (req, res) => {

	// Skills.find(function (err, skills) {
 //  		if (err) return console.error(err);
 //  		res.send(skills);
	// })

	Quests.find()
	.populate('answer', ['title', 'content'])
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

let getOneQuest = (req, res) => {

	Quests.findOne(
		{
			title: req.params.title 
		},
		function (err, title) {
  		if (err) res.send(err);
  		res.send(title);
		})

}

let createQuests = (req, res) => {

	let quest = new Quests(
		{ 
			title: req.body.title, 
			content: req.body.content,
			answer: req.body.answer
		});

	quest.save(function (err) {
  	if (err) return console.error(err);
	});

	res.send(quest);

}

let delQuests = (req, res) => {
	
	Quests.remove(
		{
			title: req.body.title
		},
		function(err) {
			if(err) res.send(err);
		}
	);

	res.send('Question Removed!')
}

let updateQuests = (req, res) => {

	Quests.findOneAndUpdate(
		{
			title: req.body.oldTitle
		},
		{
			title: req.body.title,
			content: req.body.content,
			answer: req.body.answer
		},
		function(err) {
			if(err) res.send(err);
		}
	);

	res.send('Quest updated')

}

module.exports = {
	getQuests,
	getOneQuest,
	createQuests,
	delQuests,
	updateQuests
}