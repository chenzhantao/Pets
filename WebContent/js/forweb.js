var Dialog;
var g = {
    fullheight:function(elem,cut,min) {
        if($(elem).length==0){
            return;
        }
        if(cut==undefined){
            cut=0
        }
        var top = $(elem).offset().top;
        if(min=='min'){
            $(elem).css({'min-height': $(window).height() - top-cut});
            $(window).resize(function () {
                var top = $(elem).offset().top;
                $(elem).css({'min-height': $(window).height() - top-cut});
            });
            return;
        }
        $(elem).css({'height': $(window).height() - top-cut});
        $(window).resize(function () {
            var top = $(elem).offset().top;
            $(elem).css({'height': $(window).height() - top-cut});
        });
    },

    TabShow: function (tabNavID, $pageTabBox, Event) {/*简单的tab切换效果*/
        var $pageTabBox = $($pageTabBox);
        var $pageChild = $pageTabBox.children('div');
        $(tabNavID).children('li').not(".more").bind(Event, function () {
            var $this = $(this);
            var index = $this.index();
            // alert(fn);
            $this.addClass('active').siblings().removeClass('active')
            $pageChild.removeClass('active').hide();
            $pageChild.eq(index).addClass('active').show();
            //return false;
        });
    },
    AlertBox: function (elem, alertBox, obj, callbacksure, callbackclose) { //可以增加关闭和其他按钮的回调函数
        if ($(alertBox).length == 0) {
            return
        }
        if($.ui.Dialog){
            var opt = {
                elem: alertBox,
                overlay: false
            }
            if (typeof obj == 'object') {
                $.extend(opt, obj)
            }
            var Dialog = new $.ui.Dialog(elem, opt);
            $(alertBox).find(".close").click(function () {
                Dialog.close();
                if (typeof callbackclose == 'function') {
                    callbackclose();
                }
            });
            $(alertBox).find(".save_btn").click(function () {
                Dialog.close();
                if (typeof callbacksure == 'function') {
                    callbacksure();
                }
            });
        }
    },
    AlertText: function (elem, obj) {//具体配置请参考Dialog库
        if($.ui.Dialog){
            var Dialog = new $.ui.Dialog(elem, obj);
        }
    }
}

//iframe链接地址改变
$(function(){
    g.fullheight('#left');
    g.fullheight('.right-main');
    g.fullheight('.bar');
    g.fullheight('#con',30,'min');





    //先移除所有能找到的a标签的父元素的样式，再赋予this的父元素的样式，如果反过来先赋予this的父元素的样式，再移除的话，会把所有a标签的父元素样式都移除，除非找出除了当前a标签之外的所有a标签，这样很麻烦
    $('#left').find('a').bind('click',function(){
        var $this=$(this);
        //var src=$(this).attr('href');
       // $('#mainFrame').attr('src',src);
        $('#left').find('a').parent().removeClass('active');
        //$this.parents().removeClass('active');
        $this.parent().addClass('active');
       // return false;
    });




   /* $('.left_navtit').click(function(){
        $('.left_navtit').removeClass('menu_bg');
        $(this).addClass('menu_bg');
        $('.menu_3').slideUp();
        $(this).next().slideDown();
    });


    $('.left_navtit1').click(function(){
        $('.left_navtit1').removeClass('menu_bg1');
        $(this).addClass('menu_bg1');
        $('.menu_31').slideUp();
        $(this).next().slideDown();
    });*/



    $('.bar span').click(function(){
        if(!$(this).hasClass('active')) {
            $('#left').css({width: 0});
            $(this).addClass('active');
        }else {
            $('#left').css({width: 200});
            $(this).removeClass('active');
        }
    });

    $('.time-setting').find('a').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
});



//左侧菜单栏点击拉伸显示，点击隐藏
$('.left_navtit').click(function(){

    $('.left_navtit').removeClass('menu_bg');

    $('.left_navtit-1').removeClass('menu_bg-1');//这一条是我自己加上的，去除left_navtit-1元素的指定样式

    $(this).addClass('menu_bg');

    $('.menu_3').slideUp();
    $(this).next().slideDown();
});




//左侧菜单栏点击拉伸显示，点击隐藏,这是增加了一个另外的样式，点击赋予点击取消
$('.left_navtit-1').click(function(){
    $('.left_navtit-1').removeClass('menu_bg-1');
    $(this).addClass('menu_bg-1');
    $('.menu_3').slideUp();
    $('.left_navtit').removeClass('menu_bg');
});




//登录页记住用户名选项切换背景
$(".lo-dian").click(function(){
    if($(this).hasClass('active')){

        $(this).removeClass('active');

        return false;//取消默认动作，这里不加也行
    }else{
        $(this).addClass('active');
    }
});








function addTab(title, url){
    var tt = $('#tt');
    if (tt.tabs('exists', title)){
        tt.tabs('select', title);
    } else {
        var content = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
        tt.tabs('add',{
            title:title,
            content:content,
            closable:true
        });
    }
}