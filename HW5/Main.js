//Calvin Hotrum
// from class notes
var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3111);
// from class notes
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// from class notes
// double verify
app.get('/',function(req,res){
	var qParams = [];
	for (var p in req.query){
		qParams.push({'data':p,'value':req.query[p]})
	}
	var context = {};
	context.data = qParams;
	res.render('get-loopback-improved', context);

});


// from class notes
app.post('/',function(req,res){
	var parameters = [];
	for (var i in req.query) {
		parameters.push({'data':i,'value':req.query[i]})
	}
	var context = {};
	context.data = parameters;

	var bparameters = [];
	for (var j in req.body) {
		bparameters.push({'data2':j,'value':req.body[j]})
	}
	context.data2 = bparameters;
	res.render('post-loopback',context);
});


// Next three functions from class notes
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
