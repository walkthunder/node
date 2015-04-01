var express = require('express');
var app = express();
app.set('port',process.env.PORT||3000);


//set handlebars view engine
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));





app.get('/', function(req,res){
	res.render('home');
	
});

app.get('/about',function(req,res){
	var randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
	res.render('about',{fortune:randomFortune});
});
//404 catch-all
app.use(function(req,res){
	res.status(404);
	res.render(404);
});

//500 error handler
app.use(function(err,req,res,next){
	console.error(err.stack);
	
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'),function(){
	console.log('Express started on http://localhost:'+app.get('port')+'; Press Ctrl-c to terminate.');
});

//virtual cookie
var fortunes = [
	"COnquer your fears or they will conquer you.",
	"River need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasure surprise.",
	"Whenever possible, keep it simple.",
];

/*
function serveStaticFile(res,path,contentType, responseCode) {
	if(!responseCode) responseCode = 200;
	fs.readFile(__dirname+path, function(err,data) {
		if(err) {
			res.writeHead(500, {'Content-Type': 'text/plain'});
			res.end('500 - Internal Error');
		} else {
			res.writeHead(responseCode,{'Content-Type':contentType});
			res.end(data);
		}
	});
}


http.createServer(function(req, res) {
	
	var path  =req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
	switch(path) {
		
		case '':
			serveStaticFile(res, '/public/home.html','text/html');
			break;
		case '/about':
			serveStaticFile(res, '/public/about.html','text/html');

			break;
		case '/img/logo.jpg':
			serveStaticFile(res, '/public/img/logo.jpg','image/jpeg');
			break;
		default:
			serveStaticFile(res, '/public/404.html','text/html',404);
			break;
	}
	
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-c to terminate....');

*/