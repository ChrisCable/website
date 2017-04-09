var express = require('express');
//var todoController = require('./controllers/todoController');

var app = express();

//setup template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

app.get('/', function(req,res){
		res.render( 'website' );
});

app.get('/:project', function(req,res){
		var project = req.params.project;
		res.render( project , {project: project});
});
	

//fire controllers
//todoController(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');