const express = require('express');
const fs = require('fs')
const path = require('path');
var bodyParser = require("body-parser");
const resolve = (p) => path.resolve(__dirname, p)
const app = express();
let http = require('http');
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//app.use(bodyParser.json({"limit":"50mb"}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.get('/agent', function(req, res) {
    res.json('无数据')
})

app.all('/:viewname?', function(req, res) {
    if (req.params.viewname) {
        var result = JSON.parse(fs.readFileSync(resolve("./api/" + req.params.viewname + ".json")))
        res.status(200)
        res.json(result)
    } else {
        res.json('无数据')
    }
});
var server = app.listen(3334, function(err) {
    console.log(err);
})