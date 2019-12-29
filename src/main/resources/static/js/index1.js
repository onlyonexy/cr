var element = layui.element, form = layui.form;
var _select_catalog_id;
$(function(){

	element.on('nav()', function(o){
		var elem = $(o);
		var ev = elem.attr('lay-event');
		if(ev == 'fullscreen'){
			var screenElem = elem.find(':first-child');
			if(screenElem.hasClass('layui-icon-screen-full')){
				screenElem.removeClass('layui-icon-screen-full').addClass('layui-icon-screen-restore');
				__fullScreen();
			}else{
				screenElem.removeClass('layui-icon-screen-restore').addClass('layui-icon-screen-full');
				__exitFullScreen();
			}
		}else if(ev == 'refresh'){
			$('#frmMain').attr('src', $('#frmMain').attr('src'));
		}else if(ev == 'flexible'){
			if($('#lay-app').hasClass('layadmin-side-shrink')){
				$('#lay-app').removeClass('layadmin-side-shrink');
				$('#laybtn-shrink').removeClass('layui-icon-spread-left').addClass('layui-icon-shrink-right');
			}else{
				$('#lay-app').addClass('layadmin-side-shrink');
				$('#laybtn-shrink').removeClass('layui-icon-shrink-right').addClass('layui-icon-spread-left');
			}
		}else if(ev == 'console'){
			//$('#frmMain').attr('src', CTX + '/system/console.html');
		}else if(ev == 'catalog'){
			if(elem.attr('lay-href').indexOf("http")>-1) {
				window.open(elem.attr('lay-href'));
			}else {
				$('#frmMain').attr('src', CTX + '/' + elem.attr('lay-href'));
			}
			
		}
	});
	
	element.on('nav(layadmin-system-side-menu)', function(o){
		var elem = $(o);
		var ev = elem.attr('lay-event');
		var href = elem.attr('lay-href');
		if($('#lay-app').hasClass('layadmin-side-shrink')){
			$('#lay-app').removeClass('layadmin-side-shrink');
			$('#laybtn-shrink').removeClass('layui-icon-spread-left').addClass('layui-icon-shrink-right');
		}
		
		if($.trim(href) != ''){
		    var src = CTX + '/' + href;
		    if(href.indexOf("http")>-1){
		        src = href;
		    }
			$('#frmMain').attr('src', src);
		}else{
			//layer.msg('功能正在开发中，敬请期待。。。');
		}
		
	});
	
	var tcode = $.curlparam("tcode");
	loadClickCatalog(tcode);
	
});

$(window).resize(function() {
	if($(window).width() >= 1000){
		if($('#lay-app').hasClass('layadmin-side-shrink')){
			$('#lay-app').removeClass('layadmin-side-shrink');
			$('#laybtn-shrink').removeClass('layui-icon-spread-left').addClass('layui-icon-shrink-right');
		}
	}else{
		if(!$('#lay-app').hasClass('layadmin-side-shrink')){
			$('#lay-app').addClass('layadmin-side-shrink');
			$('#laybtn-shrink').removeClass('layui-icon-shrink-right').addClass('layui-icon-spread-left');
		}
	}
});

function __fullScreen() {
	var elem = document.body;
	if(elem.webkitRequestFullScreen) {
		elem.webkitRequestFullScreen();
	} else if(elem.mozRequestFullScreen) {
		elem.mozRequestFullScreen();
	} else if(elem.requestFullScreen) {
		elem.requestFullscreen();
	} else {
		layer.msg('浏览器不支持全屏API或已被禁用');
	}
}

function __exitFullScreen() {
	var elem = document;
	if(elem.webkitCancelFullScreen) {
		elem.webkitCancelFullScreen();
	} else if(elem.mozCancelFullScreen) {
		elem.mozCancelFullScreen();
	} else if(elem.cancelFullScreen) {
		elem.cancelFullScreen();
	} else if(elem.exitFullscreen) {
		elem.exitFullscreen();
	} else {
		layer.msg('浏览器不支持全屏API或已被禁用');
	}
}

function logout(){
	layer.confirm('确认退出登录？', {
		btn: ['确认','取消']
	}, function(){
		window.location.replace(CTX + '/system/logout');
	});
}

var layer_uppwd_index;
function uppwd(){
	var htmlstr = '<form class="layui-form layui-form-padding">';
	htmlstr += '<div class="layui-form-item">';
	htmlstr += '<label class="layui-form-label">原密码</label>';
	htmlstr += '<div class="layui-input-block">';
	htmlstr += '<input type="password" id="opass" name="opass" placeholder="请输入原密码" lay-verify="required|upass" autocomplete="off" class="layui-input" />';
	htmlstr += '</div>';
	htmlstr += '</div>';
	htmlstr += '<div class="layui-form-item">';
	htmlstr += '<label class="layui-form-label">密码</label>';
	htmlstr += '<div class="layui-input-block">';
	htmlstr += '<input type="password" id="npass" name="npass" placeholder="请输入密码" lay-verify="required|upass" autocomplete="off" class="layui-input" />';
	htmlstr += '</div>';
	htmlstr += '</div>';
	htmlstr += '<div class="layui-form-item">';
	htmlstr += '<label class="layui-form-label">确认密码</label>';
	htmlstr += '<div class="layui-input-block">';
	htmlstr += '<input type="password" id="rnpass" name="rnpass" placeholder="请再次输入密码" lay-verify="required|upass|repwd" autocomplete="off" class="layui-input" />';
	htmlstr += '</div>';
	htmlstr += '</div>';
	htmlstr += '<div class="layui-form-item">';
	htmlstr += '<div class="layui-input-block txtr">';
	htmlstr += '<a id="btn-uppwd-submit" class="layui-btn layui-btn-sm layui-btn-normal" lay-submit lay-filter="submit-uppwd">确认</a>';
	htmlstr += '<a id="btn-uppwd-cancel" class="layui-btn layui-btn-sm layui-btn-primary" onlcick="close_uppwd()">取消</a>';
	htmlstr += '</div>';
	htmlstr += '</div>';
	htmlstr += '</form>';
	
	layer_uppwd_index = layer.open({
		type: 1,
		title: '修改密码',
		area: ['460px', '274px'], //宽高
		content: htmlstr
	});
}

form.verify({
	upass: [/(.+){6,12}$/, '密码长度必须在6到20之间'],
	repwd: function(value){
		var npass = $.trim($('#npass').val());
		if(npass != value){
			return '两次输入密码不一致';
		}
	}
});

form.on('submit(submit-uppwd)', function(data){
	
	$.ajax({
		url: CTX + '/system/mypass/update',
		type: "POST",
		cache: false,
		data: data.field,
		dataType: "json",
		beforeSend : function(XMLHttpRequest) {__opentop_loading();},
		error: function (xhr, status, e) {layer.msg('发送AJAX请求到"' + this.url + '"时出错[' + xhr.status + ']：' + e)},
		complete: function(XMLHttpRequest, textStatus) {__closetop_loading();},
		success: function(data){
			var mmsg = __iserrors(data);
			if (mmsg == '') {
				layer.close(layer_uppwd_index);
				layer.alert('密码修改成功，您可以', {
					icon: 1,
					closeBtn: 0,
					btn: ['试试新密码', '不了'],
					yes: function(index, layero){
						window.location.replace(CTX + '/system/logout');
					}
				});
			} else {
				layer.msg(mmsg, {icon: 5});
			}
		}
	});
	
	return false;
});

$('body').on("click", "#btn-uppwd-cancel", function() {
	layer.close(layer_uppwd_index);
});

function checkCatalog(o){
	var catCode = $(o).data("code");
	var catId = $(o).attr('data-id');
	var catUrl = $(o).find("a").attr('lay-href');
	_select_catalog_id = catId;
    if(catUrl.indexOf("http")>-1){ return ;}
	var pro_all_list = [];
	$.ajax({
		url: CTX + '/system/menu/' + catId + '/mymenu',
		type: "GET",
		cache: false,
		async: true,
		dataType: "json",
		beforeSend : function(XMLHttpRequest) {__opentop_loading();},
		error: function (xhr, status, e) {layer.msg('发送AJAX请求到"' + this.url + '"时出错[' + xhr.status + ']：' + e)},
		complete: function(XMLHttpRequest, textStatus) {__closetop_loading();},
		success: function(data){
			var mmsg = __iserrors(data);
			if (mmsg == '') {
				var list = data.data;
				var tmpstr = '';
				for(var i = 0; i < list.length; i++){
					tmpstr += '<li class="layui-nav-item">';
					tmpstr += '<a lay-href="' + $.trim(list[i].url) + '"><i class="layfa-menu-icon ' + $.trim(list[i].icon) + '"></i><cite>' + list[i].name + '</cite></a>';
					tmpstr += '</li>';
				}
				
				$('#left_menu').html(tmpstr);
				element.render('nav', 'layadmin-system-side-menu');
				if(catUrl){
                    $('#frmMain').attr('src', CTX + '/' + catUrl);
                }
				
			} else {
				layer.msg(mmsg, {icon: 5});
			}
		}
	});
}

function loadClickCatalog(topcode){
	var index= topcode?-1:0; //默认第一个
	$('.nav_catalog').each(function(i){
		if(index>-1 && i==index){
			$(this).trigger("click");
			return false;
		}
		var code = $(this).data("code");
		if(topcode && code && topcode==code){
			$(this).trigger("click");
			return false;
		}
	});
}