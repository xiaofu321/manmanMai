$(function(){
    //获取url地址栏中的参数
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
    //获取地址栏中的id
    //获取id值能获取对应的值
    //var pageid = getQueryString("pageid");
    var pageNum;
    pageList(0);
    $(".page > div.cen > span").text("第1页");
    $(".page > div.cen > span").attr("pageid",0);
    $(".page > div.cen > span").on("click",function(){
        $(".page > div.cen > ul").show();
    })
    $("body").on("click",".page > div.cen > ul > li",function(){
        //console.log("a");
        var pageid = $(this).attr("pageid");
        pageList(pageid);
        $(".page > div.cen > span").text("第"+(parseInt(pageid)+1)+"页");
        $(".page > div.cen > span").attr("pageid",pageid);
        $(".page > div.cen > ul").hide();
    })
    //下一页
    $(".next_btn").on("click",function(){
        var id = $(".page > div.cen > span").attr("pageid");
        id++;
        if(id>=pageNum){
            return;
        }
        pageList(id);
        $(".page > div.cen > span").text("第"+(id+1)+"页");
        $(".page > div.cen > span").attr("pageid",id);

    })
    //上一页
    $(".prev_btn").on("click",function(){
        var id = $(".page > div.cen > span").attr("pageid");
        id--;
        if(id<0){
            return;
        }
        pageList(id);
        $(".page > div.cen > span").text("第"+(id+1)+"页");
        $(".page > div.cen > span").attr("pageid",id);

    })
    function pageList(page){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getmoneyctrl",
            data:{
                pageid:page
            },
            success:function(data){
                //console.log(data);
                var list = template("list_con",data);
                $(".ctrl_list>ul").html(list);
                //页码数
                pageNum = Math.ceil(data.totalCount/data.pagesize);
                var str = "";
                for(var i = 0;i<pageNum;i++){
                    str+="<li pageid="+i+">第"+(i+1)+"页</li>";
                }
                $(".page > div.cen > ul").html(str)

            }
        })
    }
    //$.ajax({
    //    url:"http://182.254.146.100:3000/api/getmoneyctrl",
    //    data:{
    //        pageid:pageid||0
    //    },
    //    success:function(data){
    //        console.log(data);
    //        var list = template("list_con",data);
    //        $(".ctrl_list>ul").append(list)
    //        //页码数
    //        var pageNum = Math.ceil(data.totalCount/data.pagesize);
    //        console.log(pageNum);
    //        var str="";
    //        for(var i = 0;i<pageNum;i++){
    //            var url = "moneyctrl.html?pageid="+i+"";
    //            str+="<li><a href='"+url+"'>第"+(i+1)+"页</a></li>";
    //        }
    //        $(".page > div.cen > ul").html(str)
    //        $(".page > div.cen > span").html("第"+(parseInt(pageid)+1)+"页")
    //        $(".page > div.cen > span").on("click",function(){
    //            $(this).next("ul").toggle()
    //        })
    //        //上一页
    //        var prevPage = "moneyctrl.html?pageid="+(parseInt(pageid)-1)+"";
    //        //下一页
    //        var nextPage = "moneyctrl.html?pageid="+(parseInt(pageid)+1)+"";
    //        if(pageid<=0){
    //            pageid=0;
    //            prevPage = "moneyctrl.html?pageid="+pageid+"";
    //        }else if(pageid>=(pageNum-1)){
    //            pageid = pageNum-1
    //            nextPage = "moneyctrl.html?pageid="+pageid+"";
    //        }
    //        $(".prev_btn").attr("href",prevPage);
    //        $(".next_btn").attr("href",nextPage);
    //    }
    //})
})
