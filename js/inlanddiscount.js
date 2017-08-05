$(function(){
    var i = 0;
    $.ajax({
        url:"http://182.254.146.100:3000/api/getinlanddiscount",
        success:function(data){
            var newArr = {
                "result":[]
            }
            //只拿4条数据进行渲染
            for(i = 0;i<4;i++){
                newArr.result.push(data.result[i])
            }
            console.log(data);
            var html = template("inland_list",newArr)
            $(".inland_product ul").append(html);
            $(".spinner").hide();
            //滚动条滚动的距离
            //页面的高度-内容的高度 = 滚动条滚动的最大距离
           height = $(".inland_product").height()-$(document.body).height();
           //console.log(height)   
        }
    })
     var scrollTop = $("body").scrollTop();
     var height = $(".inland_product").height()-$(document.body).height();
     $(window).on("scroll",function(){
        scrollTop = $("body").scrollTop();
        //console.log(scrollTop)
        console.log("scrollTop="+scrollTop+"-------"+"height="+height)
        if(scrollTop==height && scrollTop!=0){
             console.log(i)
        }
    })
})
