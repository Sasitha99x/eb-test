var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs'),
    /*
    we can remove all the html if needed
    */
    html = fs.readFileSync('index.html');
    errorHtml = fs.readFileSync('error.html');

/*
    This server will work as main eb handler
*/
var server = http.createServer(function (req, res) {
    params = req.url.substring(req.url.indexOf('?') + 1); // authentication parameters
    if (params === 'data=100') { // for test app if function for authenticate the request checking whether params equal to "data=100"
    /*
        for routing having separate file would be perfect.. also each method too..
    */
        if (req.method === 'POST') { // if post
            res.writeHead(200);
            res.write(params);
            res.end();
        } else if (req.method === 'PUT') { // if put
            res.writeHead(200);
            res.write(html);
            res.end();
        } else { // if get or delete
            if (req.url === '/newurl') {  // with having "/newurl" extention
                res.writeHead(200);
                res.write(req.url);
                res.end();
            } else {
                res.writeHead(200);
                res.write(req.url);
                res.end();
            }
        }
    } else { // if authentication fails
        res.writeHead(200);
        res.write(errorHtml);
        res.end();
    }
});

// Listen on port 3000, IP defaults to 127.0.0.1
server.listen(port);

// Put a friendly message on the terminal
console.log('Server running at http://127.0.0.1:' + port + '/');
