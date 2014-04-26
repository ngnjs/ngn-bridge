var Primus = require('primus'),
    polo = require('polo'),
    apps = polo({monitor: true}),
    port = process.env.PORT || 55555,
    http = require('http'),
    js = null,
    server = http.createServer(function(req, res){
      if (!req.upgrade){
        if (req.method === 'GET' && req.url === '/channel'){
          console.log(js);
          res.end(js);
        } else {
          res.statusCode = 404;
          res.end();
        }
      }
    }),
    channel = new Primus(server,{
      port: port,
      transformer: 'websockets',
      parser:'JSON',
      authorization: function(req,done){
        return done();
      }
    }),
    clients = {};

// Handle connections
channel.on('connection', function(socket){

  clients[socket.id] = socket;

  // Handle disconnect
  socket.on('end',function(){
    delete clients[socket.id];
  });

  // Handle data
  socket.on('data',function(data){
    channel.write(data);
  });

});

// Launch & Broadcast (mdns) the service
server.listen(port,function(){
  // Get the IP address
  require('dns').lookup(require('os').hostname(), function (err, ip, ipfamily) {
    apps.put({
      name: 'ngn-bridge',
      host: ip,
      port: port
    });
  });
  var u = require('uglify-js');
  js = u.minify(channel.library(),{fromString:true,mangle:true}).code;
});
