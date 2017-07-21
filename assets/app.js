// Doc ready recommended
$(function() {

	var $addTodoBtn = $('#addTodoBtn');
	var $todoTitle = $('#todoTitle');
	var $todoDesc = $('#todoDesc');
	var $errorSpan = $('.error');
	var $listGroup = $('.list-group');

	// Fetch the current To do items
	fetchTodoItems();

	// Validation for to do item input fields
	$addTodoBtn.on('click', function (event) {

		if ($todoTitle.val().length === 0 || $todoDesc.val().length === 0) {
			// if input fields are empty
			event.preventDefault();
			console.log('Please fill the Title & Description fields');
			$errorSpan.css('display', 'inline');
		} else {
			// add to do item
			event.preventDefault();

			// capture the title and the description field text
			// in a new obj which will be posted
			var newTodoItem = {};
			newTodoItem.title = $todoTitle.val();
			newTodoItem.desc = $todoDesc.val();

			// POST req
			$.ajax({
				type: "POST",
				url: '/api/todos',
				data: newTodoItem,
				success: function (data) {
					// GET the latest to do items from the db
					fetchTodoItems();
					$todoTitle.val('');
					$todoDesc.val('');
				}
			}); // end of POST req

		}

	}); // End of validation for to do item input fields

	// fetch the to do items
	function fetchTodoItems() {

		// GET req
		$.ajax({
			type: "GET",
			url: '/api/todos',
			success: function (data) {
				//render the current todos on the page
				renderTodos(data);
			},
			error: function (err) {
				console.log(err);
			}
		}); // end of GET req

	} // end of fetch to do items

	// Render the current to do list onto the page
	function renderTodos(data){
		// empty the current html
		$listGroup.html('');
		data.forEach(function(item){
			var template = 	'<li class="list-group-item">' +
											'<h2>' +
											item.title +
											'<span class=\'glyphicon glyphicon-remove pull-right\''+
											'data-id=' +
											item._id +
											'></span>' +
											'</h2>' +
											'<p>' +
											item.desc +
											'</p>' +
											'</li>';
			// append the current todo
			$listGroup.append(template);
			// call the remove btn handler to be re-wired
			xBtnClickHanlder();
		});

	} // end of renderTodos

	// wire up the delete btns
	function xBtnClickHanlder(){
		$('.glyphicon-remove').on('click', function(){
			// get the data id
			var _id = $(this).attr("data-id");
			deleteTodoItem (_id);
		});
	}

	// Delete To do item
	function deleteTodoItem (_id){

		$.ajax({
			url: '/api/todos/' + _id,
			type: 'DELETE',
			success: function(result) {
				// Do something with the result
				// re-render the remaining todos
				fetchTodoItems();
			},
			error: function (err) {
				console.log(err.message);
			}
		});

	} // End of Delete To do item
});