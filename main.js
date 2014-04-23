var http = require("http");
var url = require('url');
var Commander = require('./commander.class.js');

var port = (process.argv[2] > 0) ? process.argv[2] : 80;

http.createServer(function(req, res) {
	console.log("req=", req.url);
	var parts = url.parse(req.url, true);

	var callback = parts.query.callback;
	var input = parts.query.input;
	
	var commander = new Commander();

	if (commander.setcommand(input)) {
		commander.docommand();
	}
	res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(callback+"("+JSON.stringify({"output":commander.getresult()})+")"); 
}).listen(port, function(){
	console.log("Server started!");
	console.log("opened server on %j", this.address());
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});
