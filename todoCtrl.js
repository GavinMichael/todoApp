module.exports = function(app) {

	// Import Body Parser
	var bodyParser = require('body-parser');
	// create application/x-www-form-urlencoded parser
	var urlencodedParser = bodyParser.urlencoded({extended: false});

	// Import Mongoose
	var mongoose = require('mongoose');
	// DB Credentials
	var username = 'server';
	var password = 'server';
	// Connect to the DB
	mongoose.connect('mongodb://' + username + ':' + password + '@ds115493.mlab.com:15493/todoapp_db');

	// ROUTES

	// Serving the index page
	app.get('/', serveIndex);
	// Serving the to do items
	app.get('/api/todos', fetchTodos);
	// Add a new to do
	app.post('/api/todos', urlencodedParser, addTodoItem);
	// Delete a to do
	app.delete("/api/todos/:id", deleteTodoItem);

	// Serving the index page
	function serveIndex(req, res) {
		res.render('index');
	}

	// Serving the to do items
	function fetchTodos(req, res) {
		TodoModel.find(function (err, items) {
			if (err) return console.error(err);
			try {
				res.send(items);
			} catch(err) {
				console.log(err.message);
			}
		});
	}

	// To Do schema
	var TodoSchema = mongoose.Schema({
		title: String,
		desc: String
	});

	// To Do model created from the schema
	var TodoModel = mongoose.model("TodoModel", TodoSchema);

	// Add a new to do
	function addTodoItem(req, res) {
		TodoModel(req.body).save(function (err, item) {
			if (err){
				throw err;
			}
			console.log('item added');
			//sends back the item that was added with it's id
			res.send(item);
		});
	} // end of addTodoItem function

	// Delete a to do
	function deleteTodoItem(req, res) {
		TodoModel.remove({_id: req.params.id}, function (err) {
			if (err) return console.error(err);
			console.log(req.params.id)
			fetchTodos(req, res);
		});
	} // End of Delete a to do
	
};