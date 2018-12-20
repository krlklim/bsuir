const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const parser = require('../helpers/parser');
const fixer = require('../helpers/fixer');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
});

router.get('/show', (req, res) => {
	fs.readFile('incorrect.txt', (err, data) => {

		if (err) {
			console.log(err.message);
		}

		res.send(data);
	});

});

router.get('/second', (req, res) => {
	fs.readFile('correct.txt', (err, data) => {

		if (err) {
			console.log(err.message);
		}

		res.send(data);
	});

});

router.post('/', (req, res) => {
	const incorrect = parser(req.body.arr);
	fs.writeFile('incorrect.txt', incorrect, () => {});

	const correct =  fixer(incorrect);
	fs.writeFile('correct.txt', correct, () => {});

	res.status(200).end();
});


module.exports = router;
