(function($){
	/**
	 * 扩展一个常用的从数组中取出id拼接成逗号分隔字符串。用法：var ids = $.arrcomma(arr,'id');
	 */
	$.extend({
		arrcomma: function(arr,idField){
			if(!arr || !arr.length){ return ""; }
			var ids = [];
			for(var i=0; i<arr.length; i++){
				ids.push(arr[i][idField]);
			}
			return ids.join(",");
		},
		cnlownum: function(num){
			var cnlowarray = ['零','一','二','三','四','五','六','七','八','九','十'];
			return cnlowarray[num];
		},
		arrayToTree: function(data, childField, idField, pidField){
			if(!childField){childField="children";}
			idField = idField||"id";
			pidField = pidField||"_pid";
			
			var tree = [],map={};
			for(var i=0; i<data.length; i++){
				var node=data[i];
				if(!node){continue;}
				var idvalue = node[idField];
				if(idvalue !== null && idvalue !== undefined){
					map[idvalue]=node;
				}
				delete node[childField];
				
			}
			
			for(var i=0;i<data.length;i++){
				var node=data[i],pnode=map[node[pidField]];
				if(!pnode){tree.push(node); continue;}
				if(!pnode[childField]){ pnode[childField] = [];}
				pnode[childField].push(node);
			
			}
			
			return tree;
		},
		curlparam: function(name){
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(r[2]);
			}
			return null;
		}
	});
	
})(jQuery)


window.onload = function(){
	__pageloading_hide();
}

$(document).keydown(function(e) {
	var doPrevent;
	if(e.keyCode == 8) {
		var d = e.srcElement || e.target;
		if(d.tagName.toUpperCase() == 'INPUT' || d.tagName.toUpperCase() == 'TEXTAREA') {
			doPrevent = d.readOnly || d.disabled;
		} else {
			doPrevent = true;
		}
	} else {
		doPrevent = false;
	}
	if(doPrevent)
		e.preventDefault();
});

layui.config({
    base: CSTATIC + '/plugin/layui/lay/modules/'
}).extend({
    treetable: 'treetable-lay/treetable',
    treeGrid: 'treegrid-lay/treeGrid'
});

function __pageloading_show(){
	$("#__page-loading").fadeIn();
}

function __pageloading_hide(){
	$("#__page-loading").fadeOut();
}

function __iserrors(data) {
	var mmsg = '';
	if (data.res == 200) {
		// 操作成功
	} else if (data.res == 0) {
		// 登录超时
		mmsg = '登陆超时，请重新登录';
	} else {
		// 操作失败
		if ($.trim(data.msg) != '') {
			mmsg = data.msg;
		} else {
			mmsg = '操作失败';
		}
	}
	return mmsg;
}

function __opentop_loading(){
	window.top.layer.load(1, {
		shade: [0.6, '#fff']
	});
}

function __closetop_loading(){
	window.top.layer.closeAll('loading');
}

function __openFormWin(title, url, area){
	if($.trim(area) == ''){
		area = ['90%', '90%'];
	}
	var index = window.top.layer.open({
		type: 2,
		title: title,
		shadeClose: false,
		shade: [0.6, '#fff'],
		maxmin: false,
		area: area,
		content: url
	});
	//window.top.layer.full(index);
}

function __closeFormWin(){
	window.top.layer.closeAll('iframe');
}

function __gridFormSaveSuc(gridId, msg){
	parent.$('#frmMain')[0].contentWindow.table.reload(gridId);
	window.top.layer.msg(msg, {icon: 1});
	__closeFormWin();
}

function __opsuccess(msg){
	if($.trim(msg) == ''){
		msg = '操作成功';
	}
	window.top.layer.msg(msg, {icon: 1});
}

function __operror(msg){
	if($.trim(msg) == ''){
		msg = '操作失败';
	}
	window.top.layer.msg(msg, {icon: 5});
}

function __removeResource(o){
	var index = layer.confirm('确认删除此附件？', function(){
		$(o).parent().parent().remove();
		layer.close(index);
	});
}

function __downloadResource(id){
	var index = layer.confirm('即将下载文件...', function(){
		window.open(CTX + '/system/resource/' + id + '/downloadFile.html');
		layer.close(index);
	});
}

function __previewResourceInTopWin(id){
	var url = CSTATIC + '/plugin/pdfshow/web/viewer.html?file=' + encodeURIComponent(CTX + '/system/resource/' + id + '/fileToStream');
	window.top.layer.open({
		type: 2,
		title: '文件预览',
		shade: [0.6, '#fff'],
		area: ['90%', '90%'],
		content: url
	});
}

function __previewResourceInNewWin(id){
	window.open(CSTATIC + '/plugin/pdfshow/web/viewer.html?file=' + encodeURIComponent(CTX + '/system/resource/' + id + '/fileToStream'), '预览文件');
}

function common_dateFmt(value,row,index){
	return $.tool.dateStr(value);
}


/**
 * 加载本次编制的所有征求意见信息，所有内容在 feedback-container 中
 */
function common_loadAdvicesOfRevision(revisionid){
	PG.advicenextnum = 1;
	$.post(CTX+"/inst/writepage/adviceload/"+revisionid,function(resp){
		$(".feedback-container").empty();
		$.each(resp.data,function(i,ad){
			var htm = [
				'<div class="feedback-wrapper">',
				'<div class="feedback-summary feedbackadvice">',
				'	<div class="feedback-content ">',
				'		<div class="feedback-info"><span class="feedback-field badge color-olive">第'+ad.advicenum+'次征集</span><span class="feedback-field">征求日期：<b>'+$.tool.dateStr(ad.begintime)+'</b></span><span class="feedback-field">截止日期：<b>'+$.tool.dateStr(ad.endtime)+'</b></span>',
				'			<span class="feedback-field">收到意见：<b>'+(ad.feedbacksubmitnum||0)+'条</b></span><span class="feedback-field">征集状态：<b>'+ADVICESTATUSFmt(ad.advicestatus)+'</b></span><span class="feedback-field">征集单位：<b>'+(ad.feedbackList?ad.feedbackList.length: 0)+'个</b></span>',
				'		</div>',
				'		<div class="feedback-info">征集名单：<span><b class="advicedeptlabel"></b><i>（共<b title="，显示所有被征集名单" class="advicedeptcount">0</b>个）</i></span></div>',
				'		<div class="feedback-textarea">',
				'			<div class="feedback-introleft">征集说明：</div>',
				'			<div class="feedback-introright"><p>'+ad.adviceintro+'</p></div>',
				'		</div>',
				'	</div>',
				'	<div class="feedback-action waitparse">',
				'		<p class="feedback-actionrow"><a class="easyui-linkbutton button-line-blue js-viewatt advice'+ad.id+'" data-pdffolderid="'+ad.revisionatt+'">预览</a><a class="easyui-linkbutton button-line-brown js-advicetoggle" data-expand="true">收缩</a></p>',
				'	</div>',
				'</div>',
				'<div class="feedback-details">'
			];
			if(ad.feedbackList) {
				$.each(ad.feedbackList, function (j, fd) {
					if(fd.fstatus == 121020) {
						var h =
							[
								'	<div class="feedback-detail">',
								'		<div class="feedback-detail-left">',
								'			<div class="feedback-detail-num">第' + (j + 1) + '条</div>',
								'			<div class="feedback-detail-desc">',
								'				<div class="feedback-detail-dept">' + fd.text + '</div>',
								'				<div class="feedback-detail-time">' + $.tool.dateStr(fd.finaldate) + '</div>',
								'			</div>',
								'		</div>',
								'		<div class="feedback-detail-right"><pre>'+fd.deptcommet+'</pre>',
								'		</div>',
								'	</div>'
							]
						htm.push(h.join(""));
					}
				});
			}
			htm.push(
				'</div></div>');

			$(".feedback-container").prepend(htm.join(""));
			var list= ad.feedbackList;
			if(list) {
				var deptnames = [];
				$.each(list,function(i,item){
					if(i<10)
						deptnames.push(item.text);
				});
				var $feedbackadvice = $(".advice"+ad.id).closest(".feedbackadvice");
				$(".advicedeptlabel", $feedbackadvice).html(deptnames.join("、"));
				$(".advicedeptcount", $feedbackadvice).html(list.length);
			}

			$.parser.parse(".feedback-container .feedback-action.waitparse");
			$(".waitparse").removeClass("waitparse");

		});
	},"json");
}
$(function(){
	$(".feedback-container").on("click",".js-viewatt",function(){
		console.log("预览正文");
		common_openPreviewDialog.call(this);
	});
	$(".feedback-container").on("click",".js-advicetoggle",function(){
		console.log("展开，折叠");
		var the = this;
		var $wrapper = $(this).closest(".feedback-wrapper");
		var expand = $(this).data("expand");
		if(expand) {
			$(this).find(".l-btn-text").html("展开");
			$(this).data("expand",false);
			$wrapper.find(".feedback-details").hide();
		}
		else{
			$(this).find(".l-btn-text").html("收缩");
			$(this).data("expand",true);
			$wrapper.find(".feedback-details").show();
		}
	});

});
/** 加载显示 评审计划 */
function common_loadPsPlanList(instid){
	$.post(CTX+"/inst/detail/psplanload/"+instid,function(resp){
		$(".psplan-container").empty();
		$.each(resp.data,function(i,psplan){
			var htm = [
				'<div class="feedback-wrapper">',
				'<div class="feedback-summary feedbackadvice">',
				'	<div class="feedback-content ">',
				'		<div class="feedback-info">',
				'           评审日期：<b>'+$.tool.dateStr(psplan.plandate)+'</b>',
				'		</div>',
				'		<div class="feedback-info">',
				'           评审内容：<b>'+psplan.content+'</b>',
				'       </div>',
				'	</div>',
				'</div>',
				'</div>'
			];
			$(".psplan-container").prepend(htm.join(""));
			$.parser.parse(".psplan-container");
		});
	},"json");
}
/** 加载显示 培训计划 */
function common_loadTrainPlanList(instid){
	$.post(CTX+"/inst/detail/trainplanload/"+instid,function(resp){
		$(".trainplan-container").empty();
		$.each(resp.data,function(i,trainplan){
			var htm = [
				'<div class="feedback-wrapper">',
				'<div class="feedback-summary feedbackadvice">',
				'	<div class="feedback-content ">',
				'		<div class="feedback-info">',
				'           培训日期：<b>'+$.tool.dateStr(trainplan.traindate)+'</b>',
				'           <span class="feedback-field">培训人：<b>'+trainplan.rname+'</b></span>',
				'		</div>',
				'		<div class="feedback-info">',
				'           培训部门：<b>'+trainplan.dept_name+'</b>',
				'       </div>',
				'	</div>',
				'</div>',
				'</div>'
			];
			$(".trainplan-container").prepend(htm.join(""));
			$.parser.parse(".trainplan-container");
		});
	},"json");
}
/** ### 需要引入对应 css js 文件，加载显示制度履历 */
function common_loadRevesionHistory(instid){
	$.post(CTX+"/inst/detail/revisionhistorydata",{ihid: instid},function(resp){
		//生成好结构
		var $container = $(".inst-timeline").empty();
		var lineLIs = [],contentLIs = [];
		$.each(resp.data,function(i,node){

			lineLIs.push('<li><a href="#0" data-date="19/01/2015" '+(i==0?'class="selected"':'')+'>'+node.revtypelabel+'<br/>'+$.tool.dateStr(node.auditdate)+'</a></li>');

			contentLIs.push('<li data-date="19/01/2015" '+(i==0?'class="selected"':'')+'>' +
				'<table class="common-table">' +
				'<tr><th class="common-tdlabel common-wpx160">制度名称</th><th class="common-tdlabel common-wpx100">编制时间</th><th class="common-tdlabel common-wpx100">首次编制</th><th class="common-tdlabel common-wpx100">修订编制</th><th class="common-tdlabel common-wpx100">废止</th><th class="common-tdlabel common-wpx100">编号</th></tr>' +
				'<tr><td rowspan="2">'+node.iname+'</td><td>'+$.tool.dateStr(node.auditdate)+'</td><td>'+(node.isadd?'是':'-')+'</td><td>'+(node.isedit?'是':'-')+'</td><td>'+(node.isdiscard?'是':'-')+'</td><td>'+node.icode+'</td></tr>' +
				'<tr><td class="common-tdlabel common-hpx80">说明</td><td colspan="4">'+node.demandexplain+'</td></tr>'+
				'</table>'+
				'</li>');
		});

		var html = [
			'<div class="timeline">',
			'<div class="events-wrapper" style="width: 90%">',
			'<div class="events">',
			'<ol>',
			lineLIs.join(""),
			'</ol>',
			'<span class="filling-line" aria-hidden="true"></span>',
			'</div>',
			'</div>',
			'<ul class="cd-timeline-navigation">',
			'<li><a href="#0" class="prev inactive">Prev</a></li>',
			'<li><a href="#0" class="next">Next</a></li>',
			'</ul>',
			'</div>',
			'<div class="events-content">',
			'<ol>',
			contentLIs.join(""),
			'</ol>',
			'</div>'
		];
		//时间线初始化
		$container.html(html.join(""));
		debugger;
		timelines = $('.cd-horizontal-timeline');
		(timelines.length > 0) && initTimeline(timelines);
	},"json");
}

/** 预览窗口 */
function common_openPreviewDialog(pdffolderid) {
    var id2 = $(this).data("pdffolderid");
    if (id2) {
        pdffolderid = id2;
    }

    var dlg = $("#commonPreviewDialog");
    if (dlg.length == 0) {
        $("body").append('<div id="commonPreviewDialog"></div>');
        dlg = $("#commonPreviewDialog");
        dlg.dialog({
            title: '查看制度附件正文',
            width: 800,
            height: 600,
            maximizable: true,
            closed: false,
            cache: false,
            bodyCls: 'common_previewdlgbody',
            content: '<iframe frameborder="0" style="padding:0;width:100%; height:100%;"></iframe>',
            modal: true
        });
    }
    dlg.find("iframe").attr("src", CTX + "/inst/detail/previewpdf/" + pdffolderid);
    dlg.dialog("open");
}



var SYS = {
    /** msg 0-橙色感叹号；1-绿色对号；2-红色错号；3-黄色问号；4-灰色小锁；5 红色哭脸；6-绿色微笑；*/
    /*成功提示窗口*/
    tipOK: function(msg, callback){
        layer.msg(msg||"操作成功", {icon: 1}, callback);
    }
    /*出错提示窗口*/
    ,tipFAIL: function(msg, callback){
        layer.msg(msg||"操作失败", {icon: 2}, callback);
    }
    ,tipSTD: function(json, successMsg){
        if(json.success){
            SYS.tipOK();
        }
        else{
            SYS.tipFAIL(json.msg);
        }
    }
    ,tipWARN: function(msg){
        layer.msg(msg||"提醒", {icon: 0});
    }
    ,confirm: function(txt, okcallback,failcallback){
        $.messager.confirm("确认", txt, function (ok) {
            if(ok){
                if(typeof okcallback === "function"){
                    okcallback();
                }
            }
            else{
                if(typeof failcallback === "function"){
                    failcallback();
                }
            }
        });
    }


}
