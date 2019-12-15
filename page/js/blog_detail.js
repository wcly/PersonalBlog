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
        if(searchUrlParams == ""){
            return;
        }
        let bid = -1;
        for(let i = 0; i < searchUrlParams.length; i++){
            console.log(searchUrlParams[i].split("=")[0] == 'bid')
            if(searchUrlParams[i].split("=")[0] == 'bid'){
                try{
                    bid = parseInt(searchUrlParams[i].split("=")[1]);
                }catch(e){
                    console.log(e);
                }
            }
        }
        axios({
            method: 'get',
            url: '/queryBlogById?bid=' + bid,
        }).then(function(resp){
            console.log(resp);
            const result = resp.data.data[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.tags = result.tags;
            blogDetail.ctime = result.ctime;
            blogDetail.views = result.views;
        }).catch(function(err){
            console.log("请求失败");
        });
    },
});