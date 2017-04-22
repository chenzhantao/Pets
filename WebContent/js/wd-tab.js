/**
 * Created by Administrator on 2014/11/10.
 */
$.widget('wd.tab',{

    version:'1.0.0',

    options:{
        event:'click',
        effects:null,
        callback:function(tab){},
        closeCallback:function(tab){}
    },

    _create:function(){
        var that=this,
             element=this.element,
             tabNav=element.children('.wd-tab-nav').children('li'),
             tabContent=element.children('.wd-tab-content').children('.wd-tab-pane');
            // console.log(element);
        if (element.data('effect') != undefined) {
            this.options.effect = element.data('effect');
        }
        if (element.data('event') != undefined) {
            this.options.event = element.data('event');
        }
        /*this.init(tabNav,tabContent);*/

        this.removeTab(tabNav);

        element.on(this.options.event,'.wd-tab-nav > li > a',function(e){

            e.preventDefault();
            e.stopPropagation();
            if ($(this).parent().hasClass('disabled')) {
                return false;
            }
            tabNav.removeClass('active');
            tabContent.hide();
            that.showTab($(this));
            return true;

        })
    },

    /*init:function(tabNav, tabContent){
        tabNav.each(function(){
            if($(this).hasClass('active')){
                var current_tab=$($(this).children('a').attr('href'));
                tabContent.hide();
                current_tab.show();
            }
        });
    },*/

    showTab:function(currentElement){
        this.options.callback(currentElement);
        currentElement.parent().addClass('active');
        var current_tab = $(currentElement.attr("href"));
        switch (this.options.effect) {
            case 'slide': current_tab.slideDown(); break;
            case 'fade':  current_tab.fadeIn(); break;
            default:      current_tab.show();
        }
        /*if (element_id != undefined) window.localStorage.setItem(element_id+"-current-tab", $(this).attr("href"));*/
    },
    removeTab:function(){
        var that=this;
        var element=this.element;
        element.on('click','.close',function(e){
            var e=e||window.event;
            var currentA=$(this).parent();
            var currentLi=currentA.parent()
            if(currentLi.hasClass('active')){
                var nextLi=currentLi.next(),preLi=currentLi.prev();
                if(nextLi.length>0){
                    that.showTab( nextLi.children('a'));
                }else{
                   if(preLi.length>0){
                     that.showTab( preLi.children('a'));
                   }
                }
            }
            currentLi.remove();
            $(currentA.attr('href')).remove();
            that.options.closeCallback(this);
            e.preventDefault();
            e.stopPropagation();
        });
    },
    _destroy: function(){

    },
    _setOption: function(key, value){
        this._super('_setOption', key, value);
    }
});

$(function(){
    $("[data-wd='tab']").tab();
});

