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
    var couponid = getQueryString("couponid");
    //console.log(couponid);
    $.ajax({
        url:"http://182.254.146.100:3000/api/getcouponproduct?couponid="+couponid,
        success:function(data){
            console.log(data);
            var html = template("list_con",data);
            $(".couponproduct_list ul").html(html)
        }
    })
})