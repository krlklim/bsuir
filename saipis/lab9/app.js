const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers/router');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('client'));

app.all('*', (req, res, next) => {
	console.log(req.url);
	console.log(req.method);
	next();
});

app.use('/', router);

app.listen(3000, () => {
	console.log('Listening port 3000')
});
