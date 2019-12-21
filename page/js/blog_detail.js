const blogDetail = new Vue({
    el: '#blog_detail',
    data: {
        title: '',
        content: '',
        ctime: '',
        tags: '',
        views: '',
    },
    computed: {

    },
    created() {
        const searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split('&') : "";
        if (searchUrlParams == "") {
            return;
        }
        let bid = -10;
        for (let i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split("=")[0] == 'bid') {
                try {
                    bid = parseInt(searchUrlParams[i].split("=")[1]);
                } catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method: 'get',
            url: '/queryBlogById?bid=' + bid,
        }).then(function (resp) {
            const result = resp.data.data[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.tags = result.tags;
            blogDetail.ctime = result.ctime;
            blogDetail.views = result.views;
        }).catch(function (err) {
            console.log("请求失败");
        });
    },
});

const sendComment = new Vue({
    el: '#send_comment',
    data: {
        vcode: "",
        rigthCode: '',
    },
    computed: {
        changeCode: function () {
            return function () {
                axios({
                    method: 'get',
                    url: '/queryRandomCode'
                }).then(function (resp) {
                    sendComment.vcode = resp.data.data.data
                    sendComment.rigthCode = resp.data.data.text
                })
            }
        },
        sendComment: function () {
            return function () {
                const code = document.getElementById("comment_code").value;
                if (code.toLowerCase() != sendComment.rigthCode.toLowerCase()) {
                    alert('验证码错误');
                    return;
                }
                const searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split('&') : "";
                if (searchUrlParams == "") {
                    return;
                }
                let bid = -10;
                for (let i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split("=")[0] == 'bid') {
                        try {
                            bid = parseInt(searchUrlParams[i].split("=")[1]);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                const replay = document.getElementById("comment_reply").value;
                const replayName = document.getElementById("comment_reply_name").value;
                const name = document.getElementById("comment_name").value;
                const email = document.getElementById("comment_email").value;
                const content = document.getElementById("comment_content").value;
                axios({
                    method: 'get',
                    url: '/addComment?bid=' + bid + '&parent=' + replay + '&userName=' + name + '&email=' + email + '&content=' + content + '&parentName=' + replayName,
                }).then(function (resp) {
                    alert('评论成功')
                })
            }
        }
    },
    created: function () {
        this.changeCode();
    }
})

const blogComments = new Vue({
    el: '#blog_comments',
    data: {
        total: 0,
        comments: [],
    },
    computed: {
        replay: function () {
            return function (commentId, userName) {
                document.getElementById('comment_reply').value = commentId;
                document.getElementById('comment_reply_name').value = userName;
                location.href = "#send_comment";
            }
        }
    },
    created: function () {
        const searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split('&') : "";
        if (searchUrlParams == "") {
            return;
        }
        let bid = -10;
        for (let i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split("=")[0] == 'bid') {
                try {
                    bid = parseInt(searchUrlParams[i].split("=")[1]);
                } catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method: 'get',
            url: `/queryCommentsByBlogId?bid=${bid}`
        }).then(resp => {
            blogComments.comments = resp.data.data;
            for (let i = 0; i < blogComments.comments.length; i++) {
                if (blogComments.comments[i].parent > -1) {
                    blogComments.comments[i].options = '回复@' + blogComments.comments[i].parent_name
                }
            }
        })
        axios({
            method: 'get',
            url: '/queryCommentCountByBlogId?bid=' + bid
        }).then(resp => {
            blogComments.total = resp.data.data[0].count
        })
    }
})