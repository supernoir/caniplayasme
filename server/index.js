const express = require('express');
const app = express();
const port = process.env.port || 3030;
const FuseJS = require('fuse.js');

const allgamedata = require('../data/allgamedata.json');

const options = {
	shouldSort        : true,
	includeScore      : true,
	includeMatches    : true,
	threshold         : 0.6,
	location          : 0,
	distance          : 100,
	maxPatternLength  : 32,
	minMatchCharLength: 2,
	keys              : ['name']
};
const fuse = new FuseJS(allgamedata, options); // "list" is the item array

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/games/', (req, res) => {
	let searchItem = req.query.game;
	let searchResult = fuse.search(searchItem);

	res.json({
		result: searchResult
	});
});

app.get('/games/all', (req, res) => {
	try {
		res.json({ games: allgamedata });
	} catch (error) {
		throw error;
	}
});

console.log(`Server running on port ${port}`);
app.listen(port);
