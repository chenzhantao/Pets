/***
 * 小鸟弹出层插件，由漫画Jquery弹出层插件改编而来
 * QQ:9169775
 * 编写时间：2013年3月21号
 * version:1.0
***/
function popWin(obj){
	var _z=9000;//新对象的z-index
	var _mv=false;//移动标记
	var _x,_y;//鼠标离控件左上角的相对位置		
	var _obj= $("."+obj);
	var _wid= _obj.width();
	var _hei= _obj.height();
	var _tit= _obj.find(".tit");
	var _cls =_obj.find(".close");
	var _ccc =_obj.find(".cool");
	var docE =document.documentElement;
	var left=($(document).width()-_obj.width())/2;
	var top =(docE.clientHeight-_obj.height())/2;
	_obj.css({	"left":left,"top":top,"display":"block","z-index":_z-(-1),'position': 'fixed'});
			


	_cls.on('click',function(e){
		//alert();
		var  e= e||window.event;
		e.preventDefault();
		e.stopPropagation();
		_obj.fadeOut();
		$(this).parent().parent().siblings("#maskLayer").remove();
	});


	$(window).bind("resize",function(){reModel();});
	$(document).keydown(function(event) {
		if (event.keyCode == 27) {
			$("#maskLayer").remove();
			_obj.hide();
		}
	});
	function reModel(){
		var b = docE? docE : document.body,
		height = b.scrollHeight > b.clientHeight ? b.scrollHeight : b.clientHeight,
		width = b.scrollWidth > b.clientWidth ? b.scrollWidth : b.clientWidth;
		$("#maskLayer").css({
			"height": height,"width": width
		});
	};
}