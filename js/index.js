$(function(){
    //导航
    $.ajax({
        url:"http://182.254.146.100:3000/api/getindexmenu",
        success:function(data){
            console.log(data);
            var src = template("menuTmp",data);
            $(".list").html(src);

        }
    })
    //导航加载更多
    $("body").on("click",".list li:nth-child(8)",function(){
        console.log(1);
        $(".list li:nth-last-child(-n+4)").slideToggle(200)
    })
    //折扣推荐
    $.ajax({
        url:"http://182.254.146.100:3000/api/getmoneyctrl",
        success:function(data){
            console.log(data);
            var shop = template("store_shop",data);
            $(".recommen-list_con").append(shop)
        }
    })
})