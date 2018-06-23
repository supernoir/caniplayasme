var express = require('express');
var app = express();
var host = '0.0.0.0';
var port = process.env.port || 3030;
var FuseJS = require('fuse.js');
var path = require('path');
var allgamedata = require('./data/allgamedata.json');
app.use(function (request, response, next) {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	response.header('Access-Control-Allow-Methods', 'POST, GET');
	next();
});
app.use('/static', express.static(path.join(__dirname, '/dist')));
var options = {
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
var fuse = new FuseJS(allgamedata, options);
app.get('/games/', function (req, res) {
	var searchResult = [];
	if (req !== undefined || req !== null) {
		var searchItem = req.query.game;
		searchResult = fuse.search(searchItem);
		searchResult = searchResult.splice(0, 5);
	}
	else {
		console.log('Request could not be retrieved');
		throw new Error('Request could not be retrieved');
	}
	try {
		if (searchResult.length &&
            searchResult[0].item.name !== '' &&
            typeof searchResult[0] !== undefined &&
            searchResult[0] !== null) {
			res.json({
				result: searchResult
			});
		}
		else {
			console.log('Results could not be retrieved');
			throw new Error('Results could not be retrieved');
		}
	}
	catch (error) {
		console.log('Could not create a response to your query');
		throw new Error('Could not create a response to your query');
		// To Do: Should not kill the server, display error as could not find in UI
	}
});
app.get('/games/all', function (req, res) {
	try {
		res.json({ games: allgamedata });
	}
	catch (error) {
		throw new Error('Could not retrieve any game data');
	}
});
app.listen(port, host, function () {
	console.log('Server running on port ' + port);
});
