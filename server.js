// Import Express
const express = require('express');
const app = express();

// Import the controller
require('./todoCtrl')(app);


// Defining public folder
app.use('/assets', express.static(__dirname + '/assets'));

// Setting the rendering engine to EJS
app.set('view engine', 'ejs');

var port = process.env.PORT || 3000;
// Start app and listen on port
app.listen(port, function () {
	console.log('Server Started on port ' + port);
});