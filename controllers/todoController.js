var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://localhost/todo');

//create a schema - this is like a blueprint of the db
var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'get flowers'}).save(function(err){
// 	if (err) throw err;
// 	console.log('item saved');
// });

//var data = [{item: 'get milk'}, {item: 'get milk'},{item: 'get milk'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req,res){
	//get data from mongodb and pass to view
	Todo.find({}, function(err, data){
		if (err) throw err;
		res.render('todo', {todos: data});
	});
	

});

app.post('/todo', urlencodedParser, function(req,res){
	//get data from view and add to mongodb
	var newTodo = Todo(req.body).save(function(err,data){
		if (err) throw err;
		res.json(data);
	});
	
});

app.delete('/todo/:item', function(req,res){
	Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
		if (err) throw err;
		res.json(data);
	});

});

};