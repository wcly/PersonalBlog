const randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: ['ifjid', 'rtgh0', 'fght', 'df', 'gergearga', 'grger', 'greojiiojioj','ifjid', 'rtgh0', 'fght', 'df', 'gergearga', 'grger', 'greojiiojioj','ifjid', 'rtgh0', 'fght', 'df', 'gergearga', 'grger', 'greojiiojioj']
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
        
    },
});

const newHot = new Vue({
    el: '#new_hot',
    data: {
        titleList: [
            {
                title: '这是一个连接',
                link: 'http://www.baidu.com'
            },
            {
                title: '这是一个连接',
                link: 'http://www.baidu.com'
            },
            {
                title: '这是一个连接',
                link: 'http://www.baidu.com'
            },
            {
                title: '这是一个连接',
                link: 'http://www.baidu.com'
            },
            {
                title: '这是一个连接',
                link: 'http://www.baidu.com'
            },
            {
                title: '这是一个连接',
                link: 'http://www.baidu.com'
            },
            {
                title: '这是一个连接',
                link: 'http://www.baidu.com'
            },
            {
                title: '这是一个连接',
                link: 'http://www.baidu.com'
            },
            {
                title: '这是一个连接',
                link: 'http://www.baidu.com'
            },
        ]
    }
});

const newComments = new Vue({
    el: '#new_comments',
    data: {
        commentList:[
            {
                name: '这是用户名',
                data: '2019-11-25',
                comment: "这里是评论,这里是评论,这里是评论,这里是评论,这里是评论",
            },
            {
                name: '这是用户名',
                data: '2019-11-25',
                comment: "这里是评论,这里是评论,这里是评论,这里是评论,这里是评论",
            },
            {
                name: '这是用户名',
                data: '2019-11-25',
                comment: "这里是评论,这里是评论,这里是评论,这里是评论,这里是评论",
            },
            {
                name: '这是用户名',
                data: '2019-11-25',
                comment: "这里是评论,这里是评论,这里是评论,这里是评论,这里是评论",
            },
        ]
    }
});