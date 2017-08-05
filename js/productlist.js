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
    var categoryId = getQueryString("categoryid");
    var pageNum;
    //var pageid = getQueryString("pageid");
    //console.log(categoryId);
    $.ajax({
        url:"http://182.254.146.100:3000/api/getcategorybyid?categoryid="+categoryId,
        success:function(data){
            console.log(data);
            //console.log($(".productlist_nav > ul > li:last-child"));
            $(".productlist_nav > ul > li:last-child").html(data.result[0].category+">")
        }
    })
    //默认是第一页
    $(".page > div.cen > span").html("第1页");
    $(".page > div.cen > span").attr("pageid",1);
    //调用,给一个默认值显示第一页
    list(1);
    //当点击上面span的时候下面ul显示
    $(".page > div.cen > span").on("click",function(){
        $(this).next("ul").toggle()
    })
    //点击ul里面的li
    $("body").on("click",".page > div.cen > ul > li",function(){
        //获取当前点击li的pageid
        var lipage = $(this).attr("pageid");
        list(lipage);
        //var text = $(this).text();
        //console.log(text);
        $(".page > div.cen > span").text("第"+lipage+"页");
        $(".page > div.cen > span").attr("pageid",lipage);
        $(this).parent().hide();
    })
    //上一页
    $(".prev_btn").on("click",function(){
        var id = $(".page > div.cen > span").attr("pageid");
        console.log(id);
        id-=1;
        if(id<1){
            return;
        }
        list(id);
        $(".page > div.cen > span").attr("pageid",id);
        $(".page > div.cen > span").text("第"+id+"页");
    })
    //下一页
    $(".next_btn").on("click",function(){
        var id = $(".page > div.cen > span").attr("pageid");
        id++;
        if(id>pageNum){
            return;
        }
        list(id);
        $(".page > div.cen > span").attr("pageid",id);
        $(".page > div.cen > span").text("第"+id+"页");
        //list(id,function(){
        //
        //    if(id>=pageNum){
        //        id = pageNum;
        //        $(".page > div.cen > span").attr("pageid",id);
        //        $(".page > div.cen > span").text("第"+id+"页");
        //    }
        //})

    })
    //var aa = $(".page > div.cen > ul").children("li");
    //console.log(aa);
    //详情页

    function list(page){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getproductlist",
            data:{
                "categoryid":categoryId,
                "pageid":page
            },
            success:function(data){
                console.log(data);
                var productlist = template("product_con",data);
                $(".product_con_list").html(productlist);
                //有多少页
                pageNum = Math.ceil(data.totalCount/data.pagesize);
                var str = "";
                for(var i = 0;i<pageNum;i++){
                    str+="<li pageid="+(i+1)+">第"+(i+1)+"页</li>";
                    $(".page > div.cen > ul").html(str);
                }
            }
        })
    }
    //$.ajax({
    //    url:"http://182.254.146.100:3000/api/getproductlist",
    //    data:{
    //        "categoryid":categoryId,
    //        "pageid":pageid || 1
    //    },
    //    success:function(data){
    //        console.log(data);
    //        var productlist = template("product_con",data);
    //        $(".product_con_list").html(productlist);
    //        //计算有几页
    //        //用总页数/每页显示的数量 = 多少页
    //        var pageNum = Math.ceil(data.totalCount/data.pagesize);
    //        //console.log(pageNum);
    //        var str=""
    //        for(var i = 0;i<pageNum;i++){
    //            //通过拼接字符串将参数传入到地址栏中
    //            //给a链接添加地址
    //            //通过截取地址栏中字符串
    //            //将参数传到后台
    //            //var url = "productlist.html?categoryid="+categoryId+"&pageid="+(i+1)+"";
    //            //str+="<li><a href='"+url+"'>第"+(i+1)+"页</a></li>";
    //        }
    //        $(".page > div.cen > ul").html(str);
    //        $(".page > div.cen > ul > li").on("click",function(){
    //           var pageid = $(this).attr("pageid");
    //            //console.log(pageid);
    //            $.ajax({
    //                url:"http://182.254.146.100:3000/api/getproductlist",
    //                data:{"pageid":pageid},
    //                success:function(data){
    //                    //console.log(data);
    //                    var productlist = template("product_con",data);
    //                    $(".product_con_list").html(productlist);
    //
    //                }
    //            })
    //        })
            //随着下面的页数上面也显示第几页
            //$(".page > div.cen > span").html("第"+pageid+"页");
            ////页码
            ////上一页
            ////当前的pageid-1
            //var prevPage = "productlist.html?categoryid="+categoryId+"&pageid="+(pageid-1)+"";
            ////下一页
            ////当前的pageid+1
            //var nextPage = "productlist.html?categoryid="+categoryId+"&pageid="+(parseInt(pageid)+1)+"";
            ////如果等于第一页就让他等于1
            //if(pageid<=1){
            //    //让他等于第二页
            //    pageid = 1
            //  prevPage = "productlist.html?categoryid="+categoryId+"&pageid=1"
            //    //如果pageid大于等于最后一页
            //}else if(pageid>=pageNum){
            //    nextPage = "productlist.html?categoryid="+categoryId+"&pageid="+(parseInt(pageNum));
            //}
            //console.log(pageid);
            //$(".prev_btn").attr("href",prevPage);
            //$(".next_btn").attr("href",nextPage);
        //}
    //})


})