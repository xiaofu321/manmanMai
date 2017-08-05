$(function(){
    $(".jd").on("click",function() {
        setShop()
    })
    $(".north").on("click",function(){
        setArea();
    })
    setProductList(0,0);
    function setShop() {
        $.ajax({
            url: "http://182.254.146.100:3000/api/getgsshop",
            success: function (data) {
                console.log(data);
                var jd_html = template("jd_list", data);
                $(".tir_list").html(jd_html);
                $(".tir_list").toggle();
                $(".north_list").hide();
                $(".tir_list li").on("click",function(){
                    var id = $(this).attr("shopid");
                    var text = $(this).html();
                    $(".tit .jd").html(text);
                    $(".tit .jd").attr("shopid",id);
                    $(".tir_list").hide();
                    setProductList(id,$(".tit .north").attr("areaid"))
                })
            }
        });
    }
    function setArea(){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getgsshoparea",
            success:function(data){
                console.log(data);
                var jd_html = template("list_con",data);
                $(".north_list").html(jd_html)
                $(".north_list").toggle();
                $(".tir_list").hide();
                $(".north_list li").on("click",function(){
                    var id = $(this).attr("areaid");
                    var txt = $(this).text();
                    console.log(txt);
                    txt = txt.split("（");
                    console.log(txt);
                    $(".tit .north").html(txt);
                    $(".tit .north").attr("areaid",id);
                    $(".north_list").hide();
                    setProductList($(".tit .jd").attr("shopid"),id)
                })
            }
        })
    }
    function setProductList(shopid,areaid){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getgsproduct",
            data:{"shopid":shopid,"areaid":areaid},
            success:function(data){
                var html = template("con_list",data);
                $(".con ul").html(html);
            }
        })
    }
})