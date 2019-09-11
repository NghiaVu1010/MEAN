// node server
// simple HTTP Server which reads data from a JSON file and returns in the response
var http = require('http');
var fs = require('fs');
var url = require('url');

const connect = require("connect");

const publicPath = '../client/';
const dataPath = './data/';

const host = '127.0.0.1';
const port = 3000;

var app = connect();

app.use((request, response) => {
    let clientURL  = request.url;
    //console.log(clientURL);
    //console.log("--------------");

    let parsedURL  = url.parse(clientURL);
    //console.log(parsedURL);
    //console.log("--------------");

    let href       = parsedURL.href;
    //console.log(href);
    //console.log("--------------");

    let { pathname, query } = url.parse(clientURL);

    if (href === '/') {
        response.writeHead(200, {'Content-type':'text/plain'});
        response.write('Hello, Node!');
        response.end();
    }
    else if (href === '/public/index.html') {
        response.end(fs.readFileSync(publicPath + "index.html"));
    } 
    else if (href === '/leagues') {
        response.end(fs.readFileSync(dataPath + "leagues.json"));
    } 
    else if (href === '/teams') {
        response.end(fs.readFileSync(dataPath + "teams.json"));
    } 
    else { 
        response.writeHead(404);
        response.end('404: Page Not Found!');
    }
});

http.createServer(app).listen(port, host);

console.log(`http://${host}:${port}`);
