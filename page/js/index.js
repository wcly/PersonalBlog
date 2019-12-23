const everyDay = new Vue({
    el: "#every_day",
    data: {
        content: 'loremlimfmefklmeklw'
    },
    computed: {
        getContent: function () {
            return this.content
        }
    },
    created() {
        axios({
            method: 'get',
            url: '/queryEveryDay'
        }).then(function (resp) {
            console.log(resp.data.data[0].content);
            everyDay.content = resp.data.data[0].content;
        }).catch(function (err) {
            console.log('请求失败');
        })
    },
});

const articleList = new Vue({
    el: "#article_list",
    data: {
        page: 1,
        pageSize: 2,
        count: 10,
        pageNumList: [],
        articleList: [],
    },
    computed: {
        jumpTo: function(){
            return function(page){
                this.getPage(page, this.pageSize);
            }
        },
        getPage: function () {
            return function (page, pageSize) {
                const searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split('&') : "";
                let tag = "";
                for (let i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split("=")[0] == 'tag') {
                        try {
                            tag = searchUrlParams[i].split("=")[1];
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                if(tag == ''){
                    axios({
                        method: 'get',
                        url: `/queryBlogByPage?page=${page - 1}&pageSize=${pageSize}`
                    }).then(function (resp) {
                        const result = resp.data.data;
                        let list = [];
                        for (let i = 0; i < result.length; i++) {
                            let temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    })
                    axios({
                        method: 'get',
                        url: '/queryBlogCount',
                    }).then(function(resp){
                        console.log(resp);
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    })
                }else{
                    axios({
                        method: 'get',
                        url: `/queryByTag?page=${page - 1}&pageSize=${pageSize}&tag=${tag}`
                    }).then(function (resp) {
                        const result = resp.data.data;
                        let list = [];
                        for (let i = 0; i < result.length; i++) {
                            let temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list;
                        articleList.page = page;
                    }).catch(function (resp) {
                        console.log("请求错误");
                    })
                    axios({
                        method: 'get',
                        url: `/queryByTagCount?tag=${tag}`,
                    }).then(function(resp){
                        console.log(resp);
                        articleList.count = resp.data.data[0].count;
                        articleList.generatePageTool;
                    })
                }
            }
        },
        generatePageTool: function () {
            const nowPage = this.page;
            const pageSize = this.pageSize;
            const totalCount = this.count;
            const maxPage = parseInt((totalCount + pageSize - 1) / pageSize);
            let result = [];
            result.push({text: "<<", page: 1})
            if(nowPage > 2){
                result.push({text: nowPage - 2, page:nowPage - 2});
            }
            if(nowPage > 1){
                result.push({text: nowPage - 1, page:nowPage - 1});
            }
            result.push({text: nowPage, page:nowPage});
            if(nowPage + 1 <= maxPage){
                result.push({text: nowPage + 1, page: nowPage + 1});
            }
            if(nowPage + 2 <= maxPage){
                result.push({text: nowPage + 2, page: nowPage + 2});
            }
            result.push({text: ">>", page: maxPage})
            this.pageNumList = result;
            return result;
        }
    },
    created() {
        this.getPage(this.page, this.pageSize);
    },
});