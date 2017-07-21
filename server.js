// Import Express
const express = require('express');
const app = express();

// Import the controller
require('./todoCtrl')(app);


// Defining public folder
app.use('/assets', express.static(__dirname + '/assets'));

// Setting the rendering engine to EJS
app.set('view engine', 'ejs');


// Start app and listen on port 3000
app.listen(3000, function () {
	console.log('Server Started on port 3000');
});