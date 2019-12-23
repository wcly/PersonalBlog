const express = require("express");
const globalConfig = require('./config');
const loader = require('./loader');

const app = new express();

app.use(express.static('./page/'));

app.post('/editEveryDay', loader.get('/editEveryDay'));
app.get('/queryEveryDay', loader.get('/queryEveryDay'));

app.post('/editBlog', loader.get('/editBlog'));
app.get('/queryAllBlog', loader.get('/queryAllBlog'));
app.get('/queryBlogByPage', loader.get('/queryBlogByPage'));
app.get('/queryBlogCount', loader.get('/queryBlogCount'));
app.get('/queryBlogById', loader.get('/queryBlogById'));
app.get('/queryHotBlog', loader.get('/queryHotBlog'));

app.get('/addComment', loader.get('/addComment'));
app.get('/queryRandomCode', loader.get('/queryRandomCode'));
app.get('/queryCommentsByBlogId', loader.get('/queryCommentsByBlogId'));
app.get('/queryCommentCountByBlogId', loader.get('/queryCommentCountByBlogId'));
app.get('/queryNewComments', loader.get('/queryNewComments'));

app.get('/queryRandomTags', loader.get('/queryRandomTags'));

app.get('/queryByTag', loader.get('/queryByTag'));
app.get('/queryByTagCount', loader.get('/queryByTagCount'));

app.listen(globalConfig.port, function () {
    console.log("服务器已启动");
});