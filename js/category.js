$(function(){
    $.ajax({
        url:"http://182.254.146.100:3000/api/getcategorytitle",
        success:function(data){
            console.log(data);
            var list_title = template("title",data);
            $(".category>ul").html(list_title);
            $("body").on("click",".category > ul > li > h3",function(){
                $(this).next().slideToggle(200)
                var id = $(this).attr("id");
                var _that = $(this);
                var leng = $(this).next("ul").children("li").length;
                console.log(leng);
                $(_that).parent().siblings().find("ul").slideUp(200)
                if(leng==0){
                   $.ajax({
                       url:"http://182.254.146.100:3000/api/getcategory?titleid="+id,
                       success:function(data){
                           console.log(data);
                           var con = template("list_con",data);
                           $(_that).next().html(con)

                           //$(".category > ul > li ul").html(con);
                       }
                   })
               }
            })
        }
    })
})
