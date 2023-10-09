let http = require('http');

//req > what we send to server body,params,queryParams
//res> What server response

let server = http.createServer(function(req, res){
    res.write('<h1>Hi from NodeJs Server</h1>')
    res.end()
})

server.listen(8722)