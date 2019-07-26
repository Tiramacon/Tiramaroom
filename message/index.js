let http = require('http');
let fs = require('fs');
let url = require('url');
let template = require('art-template');

let comments = [
	{
		name: 'Mike',
		content: 'hhhhhhhh',
		date: '2019-6-28'
	},
	{
		name: 'Bob',
		content: 'XD',
		date: '2019-6-27'
	}
];

http
  .createServer(function (req, res) {
  	// let reqUrl = req.url;
  	let urlObj = url.parse(req.url, true);
  	let pathname = urlObj.pathname;
  	let getObj = urlObj.query;

  	if (pathname === '/') {
  		fs.readFile('./views/index.html', function (err, data) {
  			if (err) {
  				return res.end('404 not found');
  			}
  			let indexHtml = template.render(data.toString(), {
  				comments: comments
  			});
  			res.end(indexHtml);
  		});
  	} else if (pathname.indexOf('/public/') === 0) {
  		fs.readFile('.' + pathname, function (err, data) {
  			if (err) {
  				return res.end('404 not found');
  			}
  			res.end(data);
  		});
  	} else if (pathname === '/post') {
  		fs.readFile('./views/post.html', function (err, data) {
  			if (err) {
  				console.log('404 not found');
  			}
  			res.end(data);
  		});
  	} else if (pathname === '/submit') {
  		getObj.date = new Date().toLocaleDateString();
  		comments.unshift(getObj);
  		res.statusCode = 302;
  		res.setHeader('Location', '/');
  		res.end();
  	} else {
  		fs.readFile('./views/404.html', function (err, data){
  			if (err) {
  				console.log('404 not found');
  			}
  			res.end(data);
  		});
  	}
  })
  .listen(3000, function () {
  	console.log('server is running');
  })