const express = require("express");
const globalConfig = require('./config');
const loader = require('./loader');

const app = new express();

app.use(express.static('./page/'));

app.post('/editEveryDay', loader.get('/editEveryDay'));

app.get('/queryEveryDay', loader.get('/queryEveryDay'));

app.listen(globalConfig.port, function(){
    console.log("服务器已启动");
});