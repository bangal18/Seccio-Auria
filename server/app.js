const express   = require('express');
const mysql     = require('mysql');
const app = express();
const http = require('http');
const server = http.createServer(app);
const body_parser = require('body-parser');


const cors = require('cors');
var router = require('./routers/routers').router; 

app.use(express.static(__dirname));
app.use(body_parser.json({limit: '50mb'}));
app.use(body_parser.urlencoded({limit: '50mb', extended: true}))
app.use(cors());
app.use('/',router);


server.listen(1000, ()=>{
    console.log('listening on port 1000')
});