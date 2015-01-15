var http = require('http');
var moment = require('moment');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('IP Address\t\t\tLast Update (mins)\n');
  for (var key in mylist){
    var obj = mylist[key];
//    res.write(key + '\t\t\t' + new Date(Date.now()-Date.parse(mylist[key])).getSeconds() + '\n');
    res.write(key + '\t\t\t' + moment(Date.now()).diff(Date.parse(mylist[key]), 'minutes') + '\n');
  };
  res.end('');
}).listen(1337);
console.log('Server running at http://127.0.0.1:1337/');

//var mylist = { "192.168.0.11": "Fri Oct 17 2014 02:41:14 GMT-0400 (EDT)" };
var mylist = {};
var net = require('net');
var server = net.createServer(function(c) { //'connection' listener
  var dt = new Date().toString();
  console.log(dt + ': ' + c.remoteAddress);
  mylist[ c.remoteAddress ] = dt;
  c.on('data', function(data){
    if(data='dump'){
      console.log(mylist);
    };
  });
});
server.listen(8080, function() { //'listening' listener
  console.log('server bound');
});
