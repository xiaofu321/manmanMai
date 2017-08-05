$(function(){
    $(".tit .jd").on("click",function(){
        setShop()
    })
    $(".north").on("click",function(){
        setArea()
    })
    function setShop(){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getgsshop",
            success:function(data){
                //console.log(data)
                var html = template("jd_list",data);
                $(".tir_list").html(html);
                $(".tir_list").toggle();
                $(".tir_list li").on("click",function(){
                    var id = $(this).attr("shopid");
                    var txt = $(this).text();
                    $(".jd").html(txt);
                    $(".jd").attr("shopid",id);
                    $(".tir_list").hide();
                    setList(id,$(".north").attr("areaid"))
                })
            }
        })
    }
    function setArea(){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getgsshoparea",
            success:function(data){
                //console.log(data)
                var html = template("list_con",data);
                $(".north_list").html(html);
                $(".north_list").toggle();
                $(".north_list li").on("click",function(){
                    var id = $(this).attr("areaid");
                    var txt = $(this).text();
                    txt = txt.split("（");
                    //console.log(txt[0])
                    $(".north").html(txt[0]);
                    $(".north").attr("areaid",id);
                    $(".north_list").hide();
                    setList($(".jd").attr("shopid"),id)

                })
            }
        })
    }
    setList(0,0)
    function setList(shopid,areaid){
        $.ajax({
            url:"http://182.254.146.100:3000/api/getgsproduct",
            data:{"shopid":shopid,"areaid":areaid},
            success:function(data){
                console.log(data);
                var html = template("con_list",data);
                $(".con ul").html(html)
            }
        })
    }
})