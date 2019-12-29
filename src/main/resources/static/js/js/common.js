layui.config({
    base: CTX + "/static/js/js/", //设定扩展的Layui模块的所在目录，一般用于外部模块扩展
    version: true //一般用于更新组件缓存，默认不开启。设为true即让浏览器不缓存。也可以设为一个固定的值，如：201610
});

layui.fsUtil = {};

layui.fsButton = {};

/**
 * 转义字典工具
 */
layui.fsUtil.toDict = function (dict, value) {
    var data = layui.fsDict[dict];
    var _value = "";
    if (!$.isEmpty(data) && !$.isEmpty(dict) && !$.isEmpty(value) && !$.isEmpty(data["labelField"]) && !$.isEmpty(data["valueField"])) {
        var labelField = data["labelField"];
        var valueField = data["valueField"];
        var list = data["data"];
        //分割方式，默认,
        var spaceMode = data["spaceMode"];
        if ($.isEmpty(spaceMode)) {
            spaceMode = ",";
        }
        if ($.isNumeric(value)) {
            analysis(value);
        } else if ($.type(value) == "string") {
            //value 多个,分割，循环处理
            $.each(value.split(','), function (i, e) {
                analysis(e);
            });
        }

        function analysis(value) {
            $.each(list, function (index, elem) {
                if (elem[valueField] == value) {
                    if (!$.isEmpty(_value)) {
                        _value += spaceMode;
                    }
                    if (!$.isEmpty(elem[labelField])) {
                        var css = elem["css"]; //样式处理
                        var style = elem["style"];
                        if (!$.isEmpty(css) || !$.isEmpty(style)) {
                            _value += "<span class=\"" + css + "\" style=\"" + style + "\">" + elem[labelField] + "</span>";
                        } else {
                            _value += elem[labelField];
                        }
                    }
                    return false;
                }
            });
        }

        var otherValue = data["otherValue"];
        if ($.isEmpty(_value) && !$.isEmpty(otherValue)) {
            _value = otherValue;
        }

    }
    return _value;
};
//数字前置补零
layui.fsUtil.digit = function (num, length, end) {
    var str = '';
    num = String(num);
    length = length || 2;
    for (var i = num.length; i < length; i++) {
        str += '0';
    }
    return num < Math.pow(10, length) ? str + (num | 0) : num;
};
/**
 * 日期转义
 */
layui.fsUtil.toDateString = function (d, format) {
    if ($.isEmpty(d)) {
        return "";
    }
    var date = new Date(d || new Date()),
        ymd = [
            this.digit(date.getFullYear(), 4), this.digit(date.getMonth() + 1), this.digit(date.getDate())
        ],
        hms = [
            this.digit(date.getHours()), this.digit(date.getMinutes()), this.digit(date.getSeconds())
        ];
    format = format || 'yyyy-MM-dd HH:mm:ss';
    return format.replace(/yyyy/g, ymd[0])
        .replace(/MM/g, ymd[1])
        .replace(/dd/g, ymd[2])
        .replace(/HH/g, hms[0])
        .replace(/mm/g, hms[1])
        .replace(/ss/g, hms[2]);
};

var form = layui.form,
    layer = layui.layer,
    table = layui.table,
    fsCommon = layui.fsCommon,
    fsConfig = layui.fsConfig,
    fsButtonCommon = layui.fsButtonCommon,
    statusName = $.result(fsConfig, "global.result.statusName", "errorNo"),
    msgName = $.result(fsConfig, "global.result.msgName", "errorInfo"),
    dataName = $.result(fsConfig, "global.result.dataName", "results.data"),
    loadDataType = $.result(fsConfig, "global.loadDataType", "0"),
    successNo = $.result(fsConfig, "global.result.successNo", "0"),
    servletUrl = $.result(fsConfig, "global.servletUrl");
;

function openloading() {
    layer.load(2);
}

function closeloading() {
    parent.layer.closeAll();
    layer.closeAll();
}

(function ($) {
    /**
     * 扩展一个常用的从数组中取出id拼接成逗号分隔字符串。用法：var ids = $.arrcomma(arr,'id');
     */
    $.extend({
        arrcomma: function (arr, idField) {
            if (!arr || !arr.length) {
                return "";
            }
            var ids = [];
            for (var i = 0; i < arr.length; i++) {
                ids.push(arr[i][idField]);
            }
            return ids.join(",");
        }
    });
})(jQuery)

window.onload = function () {
    pageloading_hide();
}

$(document).keydown(function (e) {
    var doPrevent;
    if (e.keyCode == 8) {
        var d = e.srcElement || e.target;
        if (d.tagName.toUpperCase() == 'INPUT' || d.tagName.toUpperCase() == 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        } else {
            doPrevent = true;
        }
    } else {
        doPrevent = false;
    }
    if (doPrevent)
        e.preventDefault();
});

/*layui.config({
    base: ctxstatic + '/plugin/layui/lay/modules/'
}).extend({
    treetable: 'treetable-lay/treetable',
    treeGrid: 'treegrid-lay/treeGrid'
});*/

function pageloading_show() {
    $("#page-loading").fadeIn();
}

function pageloading_hide() {
    $("#page-loading").fadeOut();
}

function iserrors(data) {
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

function opentop_loading() {
    window.top.layer.load(1, {
        shade: [0.6, '#fff']
    });
}

function closetop_loading() {
    window.top.layer.closeAll('loading');
}

function openFormWin(title, url, area) {
    if ($.trim(area) == '') {
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
}

function closeFormWin() {
    window.top.layer.closeAll('iframe');
}

function gridFormSaveSuc(gridId, msg) {
    parent.$('#frmMain')[0].contentWindow.table.reload(gridId);
    window.top.layer.msg(msg, {
        icon: 1
    });
    closeFormWin();
}

function opsuccess(msg) {
    if ($.trim(msg) == '') {
        msg = '操作成功';
    }
    window.top.layer.msg(msg, {
        icon: 1
    });
}

function operror(msg) {
    if ($.trim(msg) == '') {
        msg = '操作失败';
    }
    window.top.layer.msg(msg, {
        icon: 5
    });
}

function loadfile(url, param) {
    $("#downLoadIFrame").remove();
    if ($.trim(param) != '') {
        if (url.indexOf("?") != -1) {
            url += "&" + param;
        } else {
            url += "?" + param;
        }
    }
    var iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.id = "downLoadIFrame";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
}

function setUrlK(ojson) {
    var s = '', name, key;
    for (var p in ojson) {
        if (!ojson[p]) {
            return null;
        }
        if (ojson.hasOwnProperty(p)) {
            name = p
        }
        ;
        key = ojson[p];
        s += "&" + name + "=" + encodeURIComponent(key);
    }
    ;
    return s.substring(1, s.length);
};
var fsCommon = {
    //弹出窗口
    open: function (_title, _width, _height, _url, _end, isMaximize) {
        if ($.isEmpty(_width)) {
            _width = "700px";
        }
        if ($.isEmpty(_height)) {
            _height = "400px";
        }
        if (parseInt(_width.replace(/[^0-9]/ig, "")) > $(window.top.document).width()) {
            _width = $(window.top.document).width() + "px";
        }
        if (parseInt(_height.replace(/[^0-9]/ig, "")) > $(window.top.document).height()) {
            _height = $(window.top.document).height() + "px";
        }

        var index = top.layer.open({
            type: 2,
            title: _title,
            area: [_width, _height],
            fixed: true, //不固定
            scrollbar: true,
            maxmin: true,
            content: _url,
            end: _end
        });
        if (isMaximize == "1") {
            top.layer.full(index);
        }
    }
};
var active = {
    reload: function () {
        var obj = $(this);
        var call = null;
        if (obj.attr("querybefore")) {
            call = eval(obj.attr("querybefore"));
        }
        rendertable(call);
    },
    upload: function () {
        var _this = $(this);
        var _title = "上传附件";
        var _width = "400px";
        var _height = "280px";
        var _url = $.result(fsConfig, "global.uploadHtmlUrl", CTX + "/static/js/views/upload.html");
        var inputs = _this.attr("inputs");
        /* if(!$.isEmpty(inputs)){
              _url = fsCommon.getUrlByInputs(_url,inputs,null);
         }*/
        var fileParam = {};
        if (!$.isEmpty(_this.attr("fileAccept"))) {
            fileParam["fileAccept"] = _this.attr("fileAccept");
        }
        if (!$.isEmpty(_this.attr("fileExts"))) {
            fileParam["fileExts"] = _this.attr("fileExts");
        }
        if (!$.isEmpty(_this.attr("fileSize"))) {
            fileParam["fileSize"] = _this.attr("fileSize");
        }
        if (!$.isEmpty(fileParam)) {
            if (_url.indexOf('?') == -1) {
                _url += "?";
            } else {
                _url += "&";
            }
            _url += "fileParam=" + escape(JSON.stringify(fileParam));
        }
        fsCommon.open(_title, _width, _height, _url, function () {
            var uploadFilePath = top.$('meta[name="uploadFilePath"]').attr("content");
            if (!$.isEmpty(uploadFilePath)) {
                if (!$.isEmpty(_this.attr("fileElem"))) {
                    $(_this.attr("fileElem")).val(uploadFilePath);
                }
            }
        });
    },
    submit: function () {
        var obj = $(this);
        var filter = obj.attr("lay-filter");
        var url = obj.attr("url");
        if ($.trim(url) == '') {
            layer.msg("请求地址为空！", {
                icon: 7
            });
            return false;
        }
        $(".disable").each(function () {
            $(this).removeAttr("disabled");
        });
        form.on("submit(" + filter + ")", function (data) {
            var param = data.field;
            //处理的tinymce编辑器值
            $(".fsEditor").each(function (i, v) {
                param[$(this).attr("name")] = tinymce.editors[i].getBody().innerHTML;
            });
            $.ajax({
                url: url,
                type: "POST",
                cache: false,
                data: param,
                dataType: "json",
                success: function (data) {
                    if (data.error == 0) {
                        layer.msg("操作成功", {
                            icon: 6
                        });
                        var table = parent.layui.table;
                        table.reload("datatgrid");
                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        parent.layer.close(index);
                    } else {
                        $(".disable").each(function () {
                            $(this).removeAttr("disabled");
                        });
                        layer.msg("操作失败!" + data.msg, {
                            icon: 7
                        });
                    }
                }
            });
            return false;
        })
    },
    exportFile: function () {
        var obj = $(this);
        var datain = {};
        var inp = obj.attr("inputs");
        if ($.trim(inp) != '') {
            var s = inp.split(",");
            for (var i = 0; i < s.length; i++) {
                var s0 = s[i];
                var st = s0.split(":");
                if (st[0] == 'id') {

                } else {
                    var k = st[0];
                    if (st[1].indexOf("#") != -1) {
                        var va = $(st[1]).val();
                        if ($.trim(va) != '') {
                            datain[k] = va;
                        } else {
                            console.log(st[1] + "值为空");
                        }

                    } else {
                        datain[k] = st[1];
                    }
                }
            }
        }

        var url = obj.attr("url");
        if ($.trim(url) == '') {
            lay.msg("请填写地址！", {icon: 7});
            return false;
        }
        loadfile(url, setUrlK(datain));

    },
    mult: function () {
        var obj = $(this);
        var datain = {};
        var inp = obj.attr("inputs");
        if ($.trim(inp) != '') {
            var s = inp.split(",");
            for (var i = 0; i < s.length; i++) {
                var s0 = s[i];
                var st = s0.split(":");
                if (st[0] == 'id') {

                } else {
                    var k = st[0];
                    if (st[1].indexOf("#") != -1) {
                        datain[k] = $(st[1]).val();
                    } else {
                        datain[k] = st[1];
                    }
                }
            }
        }
        var checkStatus = table.checkStatus('datatgrid'),
            data = checkStatus.data;
        if ($.trim(data) == '') {
            layer.msg("请选择数据", {
                icon: 7
            });
            return false;
        }
        var json = JSON.stringify(data);
        var j = eval('(' + json + ')');
        var ids = "";
        if (j.length == 1) {
            ids = j[0].id;
        } else {
            ids = j[0].id;
            for (var i = 1; i < j.length; i++) {
                ids = ids + "," + j[i].id;
                var c;
                if (j[i].id == undefined) {
                    c = 0;
                } else {
                    c = j[i].id;
                }
            }
        }
        datain['ids'] = ids;
        var confirm = obj.attr("isconfirm") || 0;
        var conmsg = obj.attr("conmsg") || "确认操作？";
        var url = obj.attr("url");
        if ($.trim(url) == '') {
            layer.msg("请填写请求路径", {
                icon: 7
            });
            return false;
        } else {
            if (url.indexOf("/") != 0) {
                layer.msg("请求路径开始错误", {
                    icon: 7
                });
                return false;
            }
        }
        var index = layer.confirm(conmsg, function () {
            req(url, datain);
        });
        return false;
    },
    top: function () {
        var obj = $(this);
        var confirm = obj.attr("isconfirm") || 0;
        var refresh = obj.attr("refresh");
        var conmsg = obj.attr("conmsg") || "确认操作？";
        var url = obj.attr("url");
        if ($.trim(url) == '') {
            layer.msg("请填写请求路径", {
                icon: 7
            });
            return false;
        } else {
            if (url.indexOf("/") != 0) {
                layer.msg("请求路径开始错误", {
                    icon: 7
                });
                return false;
            }
        }
        var data = {};
        var inp = obj.attr("inputs");
        if ($.trim(inp) != '') {
            var s = inp.split(",");
            for (var i = 0; i < s.length; i++) {
                var s0 = s[i];
                var st = s0.split(":");
                if (st[0] == 'id') {
                    data.id = row.id;
                } else {
                    var k = st[0];
                    if (st[1].indexOf("#") != -1) {
                        var v = $(st[1]).val();
                        if ($.trim(v) != '') {
                            data[k] = v;
                        }
                    } else {
                        data[k] = st[1];
                    }

                }
            }
        }
        if (confirm == 1) {
            index = layer.confirm(conmsg, function () {
                req(url, data, refresh);
            });
        } else {
            var width = obj.attr("topWidth") || "800px";
            var height = obj.attr("topHeight") || "600px";
            var title = obj.attr("topTitle") || "";
            opForm(url, title, width, height, data, refresh);
        }

    },
    popupedit: function () {
        var obj = $(this);
        var url = obj.attr("url");
        if ($.trim(url) == '') {
            layer.msg("请填写请求路径", {
                icon: 7
            });
            return false;
        } else {
            if (url.indexOf("/") != 0) {
                layer.msg("请求路径开始错误", {
                    icon: 7
                });
                return false;
            }
        }
        var data = {};
        var inp = obj.attr("inputs");
        if ($.trim(inp) != '') {
            var s = inp.split(",");
            for (var i = 0; i < s.length; i++) {
                var s0 = s[i];
                var st = s0.split(":");
                if (st[0] == 'id') {
                    data.id = row.id;
                } else {
                    var k = st[0];
                    data[k] = st[1];
                }
            }
        }

        if ($.trim(data) != '') {
            var da = setUrlK(data);
            var tem = '?';
            if (url.indexOf("?") != -1) {
                tem = '&';
            }
            url = url + tem + da;
        }
        var width = obj.attr("topWidth") || '800px';
        var height = obj.attr("topHeight") || '600px';
        var title = obj.attr("topTitle") || '';
        layer.open({
            type: 2,
            title: title,
            anim: 2,
            shadeClose: true,
            shade: false,
            area: [width, height],
            content: url // iframe的url
        });

    }
};

/**
 * 渲染表格
 */
function bindevent() {
    $(".button").on("click", function () {
        var type = $(this).data("type");
        active[type] ? active[type].call(this) : '';
    });
}

var tableIns;

function rendertable(queryBeforeCallback) {
    var tab = $("#datatgrid");
    if (tab.length > 0) {
        var tableId = "datatgrid";
        var url = tab.attr("url"),
            method = tab.attr("method") || 'get',
            height = tab.attr("height") || "full-106";
        if ($.trim(url) == '') {
            layer.msg("表格url为空", {
                icon: 7
            });
            return false;
        }
        var formData = $("#query_form").serializeObject();
        if (typeof queryBeforeCallback === "function") {
            queryBeforeCallback.call(tab, formData);
        }
        var cols = tab.getDatagridCols();
        var need = tab.attr("need");
        var pageSize = 20,
            defaultLimits = 20,
            isPage = 1;
        this.formatDataQuery(cols["formatArr"]);
        tableIns = table.render({
            id: tableId,
            elem: "#" + tableId, //指定原始表格元素选择器（推荐id选择器）
            url: url,
            where: formData, //增加条件
            page: isPage == "1",
            method: method,
            height: height, //容器高度
            limits: defaultLimits, //每页数据选择项
            limit: pageSize,
            cols: cols.colsArr,
            response: {
                /*  statusName: statusName //数据状态的字段名称，默认：errorNo
                  ,statusCode: successNo //成功的状态码，默认：0
                  ,msgName: msgName //状态信息的字段名称，默认：errorInfo
                  ,countName: $.result(fsConfig,"global.page.response.countName","results.data.total") //数据总数的字段名称，默认：results.data.total*/
                // dataName: isPage == "1" ? $.result(fsConfig,"global.page.response.dataNamePage","results.data.list") : $.result(fsConfig,"global.page.response.dataName","results.data") //数据列表的字段名称，默认：data
            },
            done: function (res, curr, count) {
                //merge(res, curr, count);
                if (1 == need) {
                    var co = tab.attr("col");
                    if ($.trim(co) != '') {
                        var col = co.split(",");
                        layuiRowspan('province', 1);
                        layuiRowspan(col, 1); //支持数组
                        layuiRowspan("8", 1, true);
                    }

                }

            }

        });
    }
}

/**
 * 格式化数据查询
 */
var formatDataQuery = function (formatArr) {
    if (!$.isEmpty(formatArr)) {
        $.each(formatArr, function (index, dict) {
            var elem = layui.fsDict[dict];
            if ($.isEmpty(elem)) {
                return false;
            }
            var formatType = elem["formatType"]; //格式化类型
            if (formatType == "server") {
                var url = elem["loadUrl"]; //请求url
                var method = elem["method"];
                if (!$.isEmpty(url)) {
                    var inputs = elem["inputs"];
                    var param = {}; //参数
                    if (!$.isEmpty(inputs)) {
                        var inputArr = inputs.split(',');
                        $.each(inputArr, function (i, v) {
                            var paramArr = v.split(':', 2);
                            if (!$.isEmpty(paramArr[0])) {
                                param[paramArr[0]] = paramArr[1];
                            }
                        });
                    }
                    layui.use(["fsCommon", "fsConfig"], function () {
                        var fsCommon = layui.fsCommon,
                            statusName = $.result(fsConfig, "global.result.statusName", "errorNo"),
                            fsConfig = layui.fsConfig,
                            successNo = $.result(fsConfig, "global.result.successNo", "0"),
                            dataName = $.result(fsConfig, "global.result.dataName", "results.data");
                        fsCommon.invoke(url, param, function (result) {
                            if (result[statusName] == successNo) {
                                var list = $.result(result, dataName);
                                elem["data"] = list;
                            } else {
                                //提示错误消息
                                fsCommon.errorMsg(result[msgName]);
                            }
                        }, false, method);
                    });

                }
            }

        });
    }
};

var execRowspan = function (fieldName, index, flag) {
    // 1为不冻结的情况，左侧列为冻结的情况
    var fixedNode = index == "1" ? $(".layui-table-body")[index - 1] : (index == "3" ? $(".layui-table-fixed-r") : $(".layui-table-fixed-l"));
    // 左侧导航栏不冻结的情况
    var child = $(fixedNode).find("td");
    var childFilterArr = [];
    // 获取data-field属性为fieldName的td
    for (var i = 0; i < child.length; i++) {
        if (child[i].getAttribute("data-field") == fieldName) {
            childFilterArr.push(child[i]);
        }
    }
    // 获取td的个数和种类
    var childFilterTextObj = {};
    for (var i = 0; i < childFilterArr.length; i++) {
        var childText = flag ? childFilterArr[i].innerHTML : childFilterArr[i].textContent;
        if (childFilterTextObj[childText] == undefined) {
            childFilterTextObj[childText] = 1;
        } else {
            var num = childFilterTextObj[childText];
            childFilterTextObj[childText] = num * 1 + 1;
        }
    }
    var canRowspan = true;
    var maxNum; //以前列单元格为基础获取的最大合并数
    var finalNextIndex; //获取其下第一个不合并单元格的index
    var finalNextKey; //获取其下第一个不合并单元格的值
    for (var i = 0; i < childFilterArr.length; i++) {
        (maxNum > 9000 || !maxNum) && (maxNum = $(childFilterArr[i]).prev().attr("rowspan") && fieldName != "8" ? $(childFilterArr[i]).prev().attr("rowspan") : 9999);
        var key = flag ? childFilterArr[i].innerHTML : childFilterArr[i].textContent; //获取下一个单元格的值
        var nextIndex = i + 1;
        var tdNum = childFilterTextObj[key];
        var curNum = maxNum < tdNum ? maxNum : tdNum;
        if (canRowspan) {
            for (var j = 1; j <= curNum && (i + j < childFilterArr.length);) { //循环获取最终合并数及finalNext的index和key
                finalNextKey = flag ? childFilterArr[i + j].innerHTML : childFilterArr[i + j].textContent;
                finalNextIndex = i + j;
                if ((key != finalNextKey && curNum > 1) || maxNum == j) {
                    canRowspan = true;
                    curNum = j;
                    break;
                }
                j++;
                if ((i + j) == childFilterArr.length) {
                    finalNextKey = undefined;
                    finalNextIndex = i + j;
                    break;
                }
            }
            childFilterArr[i].setAttribute("rowspan", curNum);
            if ($(childFilterArr[i]).find("div.rowspan").length > 0) { //设置td内的div.rowspan高度适应合并后的高度
                $(childFilterArr[i]).find("div.rowspan").parent("div.layui-table-cell").addClass("rowspanParent");
                $(childFilterArr[i]).find("div.layui-table-cell")[0].style.height = curNum * 38 - 10 + "px";
            }
            canRowspan = false;
        } else {
            childFilterArr[i].style.display = "none";
        }
        if (--childFilterTextObj[key] == 0 | --maxNum == 0 | --curNum == 0 | (finalNextKey != undefined && nextIndex == finalNextIndex)) { //||(finalNextKey!=undefined&&key!=finalNextKey)
            canRowspan = true;
        }
    }
}
//合并数据表格行
var layuiRowspan = function (fieldNameTmp, index, flag) {
    var fieldName = [];
    if (typeof fieldNameTmp == "string") {
        fieldName.push(fieldNameTmp);
    } else {
        fieldName = fieldName.concat(fieldNameTmp);
    }
    for (var i = 0; i < fieldName.length; i++) {
        execRowspan(fieldName[i], index, flag);
    }
}

table.on('tool(datatgrid)', function (o) {
    var btnevent = o.event;
    var row = o.data;
    var _this = $(this);
    var confirm = _this.attr("isconfirm") || '0';
    var conmsg = _this.attr("conmsg") || "确认操作？";
    var url = _this.attr("url");
    if ($.trim(url) == '') {
        layer.msg("请填写请求路径", {
            icon: 7
        });
        return false;
    } else {
        if (url.indexOf("/") != 0) {
            layer.msg("请求路径开始错误", {
                icon: 7
            });
            return false;
        }
    }
    var data = {};
    var inp = _this.attr("inputs");
    if ($.trim(inp) != '') {
        var s = inp.split(",");
        for (var i = 0; i < s.length; i++) {
            var s0 = s[i];
            var st = s0.split(":");
            if (st[0] == 'id') {
                data.id = row.id;
            } else {
                var k = st[0];
                data[k] = st[1];
            }
        }
    }
    var width = _this.attr("topWidth") || "800px";
    var height = _this.attr("topHeight") || "600px";
    var title = _this.attr("topTitle") || "";
    switch (btnevent) {
        case "query":
            opForm(url, title, width, height, data);
            break;
        case "top":
            if (conmsg == 1) {
                req(url, data);
            } else {
                opForm(url, title, width, height, data);
            }
            break;
        case "delete":
            if (confirm == 1) {
                var index = layer.confirm(conmsg, function () {
                    // layer.close(index);
                    req(url, data);
                });
            } else {
                req(url, data);
            }
            break;
        default:
    }
});

/**
 * 无需打开页面
 * @param url
 * @param data
 */
function req(url, data, refresh) {
    var index;
    $.ajax({
        url: url,
        type: "POST",
        cache: false,
        data: data,
        dataType: "json",
        beforeSend: function (XMLHttpRequest) {
            index = layer.load();
        },
        error: function (xhr, status, e) {
            //layer.close(index);
            // layer.msg('发送AJAX请求到"' + this.url + '"时出错[' + xhr.status + ']：' + e);
            //console.log('发送AJAX请求到"' + this.url + '"时出错[' + xhr.status + ']：' + e);
        },
        success: function (data) {
            layer.close(index);
            if (data.error == 0) {
                layer.msg("操作成功！", {
                    icon: 6
                });
                if ($.trim(refresh) != '') {
                    var re = $("#" + refresh);
                    if (re.length > 0) {
                        re.click();
                    } else {
                        layer.msg("刷新失败！", {
                            icon: 6
                        });
                    }

                } else {
                    // var tab = layui.table;
                    table.reload("datatgrid");
                }
            } else {
                var msg = data.msg;
                var mes = "操作失败！";
                if ($.trim(msg) != '') {
                    mes += msg;
                }
                layer.msg(mes, {
                    icon: 5
                });
            }
        }
    });
}

/***
 * 打开页面
 * @param url
 * @param title
 * @param width
 * @param height
 * @param data
 */
function opForm(url, title, width, height, data, refresh) {
    if ($.trim(data) != '') {
        var da = setUrlK(data);
        var tem = '?';
        if (url.indexOf("?") != -1) {
            tem = '&';
        }
        url = url + tem + da;
    }
    layer.open({
        type: 2,
        title: title,
        area: [width, height],
        content: url,
        end: function () {
            if ($.trim(refresh) != '') {
                var b = $("#" + refresh);
                if (b.lnegth < 0) {
                    layer.msg("刷新失败！", {icon: 7});
                } else {
                    b.click();
                }
            }

        }
    });
}

$(function () {
    bindevent();
    rendertable();
});
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            var va = this.value;
            if ($.trim(va) != '') {
                o[this.name].push(va);
            }
        } else {
            var va = this.value;
            if ($.trim(va) != '') {
                o[this.name] = va;
            }
        }
    });
    return o;
};

function setUrlK(ojson) {
    var s = '',
        name, key;
    for (var p in ojson) {
        if (!ojson[p]) {
            return null;
        }
        if (ojson.hasOwnProperty(p)) {
            name = p
        }
        ;
        key = ojson[p];
        s += "&" + name + "=" + encodeURIComponent(key);
    }
    ;
    return s.substring(1, s.length);
};

function fromVal(filter, object) {
    var formElem = $('.layui-form[lay-filter="' + filter + '"]');
    formElem.each(function () {
        var itemFrom = $(this);
        layui.each(object, function (key, value) {
            if (typeof (value) === 'object') {
                fromVal(filter, value); //递归
            }
            var itemElem = itemFrom.find('[name="' + key + '"]');
            //如果对应的表单不存在，则不执行
            if (!itemElem[0]) {
                return;
            }
            var type = itemElem[0].type;
            //如果为复选框
            if (type === 'checkbox') {
                if (typeof (value) !== 'object') {
                    itemElem[0].checked = value;
                } else {
                    layui.each(value, function (index, item) {
                        itemElem.each(function () {
                            if (this.value === item.toString()) {
                                this.checked = true;
                            }
                        });
                    });
                }
            } else if (type === 'radio') { //如果为单选框
                itemElem.each(function () {
                    if (this.value === value) {
                        this.checked = true;
                    }
                });
            } else { //其它类型的表单
                itemElem.val(value);
            }
        });
    });
    form.render(null, filter);
};

form.verify({
    title: function (value) {
        if (value.length < 5) {
            return '标题至少得5个字符啊';
        }
    },
    pass: [/(.+){6,12}$/, '密码必须6到12位'],
    money: function validateMoney(money) {
        var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if (!reg.test(money)) {
            return "请输入正确的金额,且最多两位小数!";
        }
        if (Number(money) == Number(0.00)) {
            return "请输入正确的金额，不能小于0.00";
        }
    }
});