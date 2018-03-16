var express = require('express');
var morgan = require('morgan')
var bodyParser = require('body-parser');

var port = 3000;
var hostname = 'localhost';

var app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.all('/dishes', function(req,res,next){
    res.writeHead(200, {'Content-Type': 'text/html'});
    next();
    // 由于app是顺序执行的，这里app.all()希望添加Head，然后由下面的其他函数写res.end()，因此需要next()
});
app.get('/dishes', function(req,res,next){
    res.end('Will send all the dishes to you!');
});
app.post('/dishes', function(req,res,next){
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
    //因为之前已经用了bodyParser，所以这里可以使用req.body.attr
});
app.delete('/dishes', function(req,res,next){
    res.end('Deleting all dishes');
}); 

app.get('/dishes/:dishId', function(req,res,next){
    res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
});
app.put('/dishes/:dishId', function(req,res,next){
    res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.params.name + ' with details: ' + req.body.description);
});
app.delete('/dishes/:dishId', function(req,res,next){
    res.end('Deleting dish: ' + req.params.dishId);
});
app.use(express.static(__dirname + '/public'));

app.listen(port, hostname ,() => {
    console.log('Server running...');
});