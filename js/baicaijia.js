$(function(){
    $.ajax({
        url:"http://182.254.146.100:3000/api/getbaicaijiatitle",
        success:function(data){
            console.log(data);
            var html = template("nav_baicai",data);
            $(".nav ul").html(html);
            //有几个li
            var list = $(".baicaijia_nav >.nav ul").find("li");
            list.eq(0).addClass("act");
            //console.log(list.length);
            var width = 0;
            //将li的宽度相加
            for(var i = 0;i<list.length;i++){
                width+=$(list[i]).width();
            }
            //console.log(width);
            //ul的宽度 = li的数量*每个li的宽度
            var ulWidth = width+40;
            //设置ul的宽度
            $(".baicaijia_nav > .nav ul").width(ulWidth);

            var navWidth = $(".baicaijia_nav > .nav").width();
            //初始化各个参数
            //手指触摸屏幕的位置
            var startX = 0;
            //手指移动的位置
            var moveX = 0;
            //手指移动的距离
            var distanceX = 0;
            //记录当前的位置
            var currX = 0;
            //最大滑动的位置
            var maxX = 0;
            //最小滑动的位置,ul的宽度 - 盒子的宽度
            var minX = navWidth - ulWidth;
            //设置一个缓冲距离
            var distance = 50;
            //最大缓冲区间
            var maxSwipe = maxX+distance;
            //最小缓冲区间
            var minSwipe = minX-distance;
            //设置共用的方法
            //添加过渡
            function addTransform(){
                $(".baicaijia_nav > .nav ul").css("transition","all 0.2s");
            }
            //删除过渡
            function moveTransform(){
                $(".baicaijia_nav > .nav ul").css("transition","none");
            }
            //设置位置
            function setTranslate(x){
                $(".baicaijia_nav > .nav ul").css("transform","translate("+x+"px)");;
            }
            //手指进行滑动
            //获取手指触摸的位置
            $(".baicaijia_nav > .nav ul").get(0).addEventListener("touchstart",function(e){
                startX = e.touches[0].clientX;
            })
            //手指移动的位置
            $(".baicaijia_nav > .nav ul").get(0).addEventListener("touchmove",function(e){
                moveX = e.touches[0].clientX;
                //手指移动的距离
                distanceX = moveX - startX;
                //清除过渡
                moveTransform();
                //设置位置
                //如果滑动的距离+当前的位置<最大滑动距离&&如果滑动的距离+当前的位置>最小滑动距离
                if(distanceX+currX<maxSwipe&&distanceX+currX>minSwipe){
                    setTranslate(distanceX+currX)
                }

            })
            //手指离开屏幕的时候
            $(".baicaijia_nav > .nav ul").get(0).addEventListener("touchend",function(){
                //当手指离开的时候进行判断当前的位置
                //如果当前的的位置+手指移动的距离>最大的位置 = 当前的位置就等于最大的位置
                if(distanceX+currX>maxX){
                    //当前的位置 = 最大的位置
                    currX = maxX;
                    //添加过渡
                    addTransform()
                    //设置位置
                    setTranslate(currX)
                    //如果当前的位置+手指一定的距离<最小的位置 = 当前的位置等于最小的位置
                }else if(distanceX+currX<minX){
                    //当前的位置 = 最小的位置
                    currX = minX;
                    //添加过渡
                    addTransform()
                    //设置位置
                    setTranslate(currX)
                    //当前的位置+手指移动的位置>最小的位置
                    //当前的位置+手指移动的位置<最大的位置
                    //当前的位置 = 当前的位置+手指移动的位置
                }else{
                    currX = distanceX + currX
                }
            })
            //给每个li添加点击事件

            $(".nav").on("click"," li",function(){
                var index = $(this).index();
                $(this).addClass("act").siblings("li").removeClass("act")
                //计算
                var translateX = 0;
                for(var i = 0;i<index;i++){
                    translateX-= $(list[i]).width();
                }
                //console.log(translateX);
                //如果计算的宽度>最小的位置
                if(translateX>minX){
                    //当前位置 = translateY
                    currX = translateX;
                    //添加过渡
                    addTransform();
                    //设置位置
                    setTranslate(currX)
                }else{
                    //将最小的位置给当前的位置
                    currX = minX;
                    //添加过渡
                    addTransform();
                    //设置位置
                    setTranslate(currX)
                }
                var titleid = $(this).attr("id");
                console.log(titleid);
                $.ajax({
                    url:"http://182.254.146.100:3000/api/getbaicaijiaproduct",
                    data:{titleid:titleid || 0},
                    success:function(data){
                        //console.log(data);
                        var html = template("baicaijia_list",data);
                        $(".baocaijia_con ul").html(html)

                    }
                })

            });
        }
    })
    //获取url地址栏中的参数
    //function getQueryString(name) {
    //    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    //    var r = window.location.search.substr(1).match(reg);
    //    if (r != null) {
    //        return unescape(r[2]);
    //    }
    //    return null;
    //}
    //获取

    //var titleid = getQueryString("titleid");
    //console.log(titleid);
    //console.log(titleid);
    $.ajax({
        url:"http://182.254.146.100:3000/api/getbaicaijiaproduct",
        data:{titleid:0},
        success:function(data){
            //console.log(data);
            var html = template("baicaijia_list",data);
            $(".baocaijia_con ul").html(html)

        }
    })


})