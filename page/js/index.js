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
        articleList: [{
                title: '平安拼团80块的beatsx',
                content: '最近到处都在发平安拼团活动，80块的BeatsX耳机到手，第一次用这么高逼格的耳机，手感很不错，戴着略丑，音质还行，值这个价。。。如果原价盲狙的话，可能会哭晕。平安拼团beatsx耳机耳机、充电头、三对套、贴纸、一些文件',
                date: "2019-01-01",
                views: '101',
                tags: 'text1 test2',
                id: '1',
                link: ""
            },
            {
                title: '平安拼团80块的beatsx',
                content: '最近到处都在发平安拼团活动，80块的BeatsX耳机到手，第一次用这么高逼格的耳机，手感很不错，戴着略丑，音质还行，值这个价。。。如果原价盲狙的话，可能会哭晕。平安拼团beatsx耳机耳机、充电头、三对套、贴纸、一些文件',
                date: "2019-01-01",
                views: '101',
                tags: 'text1 test2',
                id: '1',
                link: ""
            },
            {
                title: '平安拼团80块的beatsx',
                content: '最近到处都在发平安拼团活动，80块的BeatsX耳机到手，第一次用这么高逼格的耳机，手感很不错，戴着略丑，音质还行，值这个价。。。如果原价盲狙的话，可能会哭晕。平安拼团beatsx耳机耳机、充电头、三对套、贴纸、一些文件',
                date: "2019-01-01",
                views: '101',
                tags: 'text1 test2',
                id: '1',
                link: ""
            },
            {
                title: '平安拼团80块的beatsx',
                content: '最近到处都在发平安拼团活动，80块的BeatsX耳机到手，第一次用这么高逼格的耳机，手感很不错，戴着略丑，音质还行，值这个价。。。如果原价盲狙的话，可能会哭晕。平安拼团beatsx耳机耳机、充电头、三对套、贴纸、一些文件',
                date: "2019-01-01",
                views: '101',
                tags: 'text1 test2',
                id: '1',
                link: ""
            },
            {
                title: '平安拼团80块的beatsx',
                content: '最近到处都在发平安拼团活动，80块的BeatsX耳机到手，第一次用这么高逼格的耳机，手感很不错，戴着略丑，音质还行，值这个价。。。如果原价盲狙的话，可能会哭晕。平安拼团beatsx耳机耳机、充电头、三对套、贴纸、一些文件',
                date: "2019-01-01",
                views: '101',
                tags: 'text1 test2',
                id: '1',
                link: ""
            },
            {
                title: '平安拼团80块的beatsx',
                content: '最近到处都在发平安拼团活动，80块的BeatsX耳机到手，第一次用这么高逼格的耳机，手感很不错，戴着略丑，音质还行，值这个价。。。如果原价盲狙的话，可能会哭晕。平安拼团beatsx耳机耳机、充电头、三对套、贴纸、一些文件',
                date: "2019-01-01",
                views: '101',
                tags: 'text1 test2',
                id: '1',
                link: ""
            },
        ],
    },
    computed: {
        jumpTo: function(){
            return function(page){
                this.getPage(page, this.pageSize);
            }
        },
        getPage: function () {
            return function (page, pageSize) {
                axios({
                    method: 'get',
                    url: `/queryBlogByPage?page=${page - 1}&pageSize=${pageSize}`
                }).then(function (resp) {
                    console.log(resp);
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