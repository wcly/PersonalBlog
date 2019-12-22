const randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: []
    },
    computed: {
        randomColor: function (params) {
            return function(){
                const red = Math.random() * 255 + 50;
                const green = Math.random() * 255 + 50;
                const blue = Math.random() * 255 + 50;
                return `rgb(${red}, ${green}, ${blue})`;
            }
        },
        randomSize: function (params) {
            return function(){
                const size = Math.random() * 20 + 12
                return `${size}px`
            }
        }
    },
    created() {
        axios({
            method: 'get',
            url: '/queryRandomTags'
        }).then(function(resp){
            let result = [];
            for(let i = 0; i < resp.data.data.length; i++){
                result.push(resp.data.data[i].tag);
            }
            randomTags.tags = result;
        });
    },
});

const newHot = new Vue({
    el: '#new_hot',
    data: {
        titleList: []
    },
    created: function(){
        axios({
            method: 'get',
            url: '/queryHotBlog'
        }).then(function(resp){
            let result = [];
            for(let i = 0; i < resp.data.data.length; i++){
                let temp = {};
                temp.title = resp.data.data[i].title;
                temp.link = '/blog_detail.html?bid=' + resp.data.data[i].id;
                result.push(temp);
            }
            newHot.titleList = result;
        });
    }
});

const newComments = new Vue({
    el: '#new_comments',
    data: {
        commentList:[]
    },
    created:function(){
        axios({
            method: 'get',
            url: '/queryNewComments'
        }).then(function(resp){
            let result = [];
            for(let i = 0; i < resp.data.data.length; i++){
                let temp = {};
                temp.name = resp.data.data[i].user_name;
                temp.comment = resp.data.data[i].comments;
                temp.date = resp.data.data[i].ctime;
                result.push(temp);
            }
            newComments.commentList = result;
        });
    }
});