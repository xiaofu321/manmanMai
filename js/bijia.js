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
    //根据productlist.html页面传过来的id去获取想对象的详细信息
    var productid = getQueryString("productid");
    var categoryid = getQueryString("categoryid");
    //console.log(productid);
    $.ajax({
        url:"http://182.254.146.100:3000/api/getcategorybyid",
        data:{"categoryid":categoryid},
        success:function(data){
            console.log(data);
            $(".productlist_nav > ul > li:nth-child(2) a").html(data.result[0].category+">");


        }
    })
    $.ajax({
        url:"http://182.254.146.100:3000/api/getproduct?productid="+productid,
        success:function(data){
            console.log(data);
            var brandName = data.result[0].productName;
            var index = brandName.indexOf(")")==-1?brandName.indexOf(" "):brandName.indexOf(")");
            var minute = brandName.slice(0,index+1);
            $(".productlist_nav > ul > li:nth-child(3)").html(minute+">");
            var str = template("details_con",data);
            $(".productInfo").append(str);
            //获取评论信息
            $.ajax({
                url:"http://182.254.146.100:3000/api/getproductcom?productid="+productid,
                success:function(data){
                    console.log(data);
                    var html = template("content",data);
                    $(".review").append(html)
                }
            })

        }
    })
})