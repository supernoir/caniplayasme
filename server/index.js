const express = require('express');
const app = express();
const port = process.env.port || 3030;
const FuseJS = require('fuse.js');

app.use((request, response, next) => {
	response.header('Access-Control-Allow-Origin', '*');
	response.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	response.header('Access-Control-Allow-Methods', 'POST, GET');
	next();
});

const allgamedata = require('../data/allgamedata.json');

const options = {
	shouldSort        : true,
	includeScore      : true,
	includeMatches    : false,
	threshold         : 0.2,
	location          : 0,
	distance          : 10,
	maxPatternLength  : 32,
	minMatchCharLength: 3,
	keys              : ['name']
};

const fuse = new FuseJS(allgamedata, options);

app.get('/games/', (req, res) => {
	let searchResult = {};

	if (req !== undefined || req !== null) {
		if (req.query !== undefined || req.query !== {}) {
			let searchItem = req.query.game;
			searchResult = fuse.search(searchItem);
			searchResult = searchResult.splice(0, 5);
		} else {
			console.log('Incorrect Query');
			throw new Error('Incorrect Query');
		}
	} else {
		console.log('Request could not be retrieved');
		throw new Error('Request could not be retrieved');
	}
	try {
		if (
			searchResult.length &&
      searchResult[0].item.name !== '' &&
      typeof searchResult[0] !== undefined &&
      searchResult[0] !== null
		) {
			res.json({
				result: searchResult
			});
		} else {
			console.log('Results could not be retrieved');
			throw new Error('Results could not be retrieved');
		}
	} catch (error) {
		console.log('Could not create a response to your query');
		throw new Error('Could not create a response to your query');
	}
});

app.get('/games/all', (req, res) => {
	try {
		res.json({ games: allgamedata });
	} catch (error) {
		throw new Error('Could not retrieve any game data');
	}
});

console.log(`Server running on port ${port}`);
app.listen(port);
