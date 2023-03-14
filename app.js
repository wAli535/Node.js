const http = require("http");

const server  = http.createServer((req,res)=>{
    //res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello World');

    res.end("My name is Ali..");
});

server.listen(8880, () => {
    console.log(`listening on 8880`);
});
