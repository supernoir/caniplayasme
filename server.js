const express = require('express');
const FuseJS = require('fuse.js');
const path = require('path');
const helmet = require('helmet');

const app = express();
const host = '127.0.0.1';
const port = process.env.port || 3032;
const allgamedata = require('./data/allgamedata.json');

app.use(helmet.contentSecurityPolicy({
	directives: {
		defaultSrc: ['\'self\''],
		styleSrc  : ['\'self\'', 'https://apis.google.com']
	}
}));

app.use(function (request, response, next) {
	response.header('Content-Security-Policy', 'default-src \'self\' https://cipam.supernoir.io https://apis.google.com http://cipam.supernoir.io');
	response.header('Content-Security-Policy', 'script-src \'self\' https://cipam.supernoir.io https://apis.google.com http://cipam.supernoir.io');
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	response.header('Access-Control-Allow-Methods', 'POST, GET');
	next();
});
app.use('/static', express.static(path.join(__dirname, '/dist')));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname,'index.html'));
});
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

app.get('/hello/', function (req,res) {
	res.send('Hello to you too');
});

app.get('/games/', function (req, res) {
	let searchResult = [];
	if (req !== undefined || req !== null) {
		const searchItem = req.query.game;
		searchResult = fuse.search(searchItem);
		searchResult = searchResult.splice(0, 5);
	}
	else {
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
			throw new Error('Results could not be retrieved');
		}
	}
	catch (error) {
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
