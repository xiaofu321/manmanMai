$(function(){
    $.ajax({
        url:"http://182.254.146.100:3000/api/getcoupon",
        success:function(data){
            console.log(data);
            var html = template("list_con",data);
            $(".coupon_list ul").append(html);
        }
    })
})
