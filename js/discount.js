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
    //获取productid
    var productid = getQueryString("productid");
    $.ajax({
        url:"http://182.254.146.100:3000/api/getdiscountproduct?productid="+productid,
        success:function(data){
            console.log(data);
            var html = template("product_temp",data);
            $(".product_con").append(html)
        }
    })
})
