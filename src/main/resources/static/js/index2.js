$(function(){


    $("body")
    .on("click",".flexible",function(){ /* 左侧菜单伸缩功能 */
        if($('#lay-app').hasClass('layadmin-side-shrink')){
            $('#lay-app').removeClass('layadmin-side-shrink');
            $('#laybtn-shrink').removeClass('layui-icon-spread-left').addClass('layui-icon-shrink-right');
        }else{
            $('#lay-app').addClass('layadmin-side-shrink');
            $('#laybtn-shrink').removeClass('layui-icon-shrink-right').addClass('layui-icon-spread-left');
        }
    })
    .on("click",".refresh",function(){/*刷新操作*/
        $('#frmMain').attr('src', $('#frmMain').attr('src'));
    })
    .on("click",".fullscreen",function(){ /*全屏操作*/
        var screenElem = $(this).find(':first-child');
        if(screenElem.hasClass('layui-icon-screen-full')){
            screenElem.removeClass('layui-icon-screen-full').addClass('layui-icon-screen-restore');
            __fullScreen();
        }else{
            screenElem.removeClass('layui-icon-screen-restore').addClass('layui-icon-screen-full');
            __exitFullScreen();
        }
    })
    .on("click",".catalog",function(){ /*顶部菜单点击操作*/
        var elem = $(this);
        var lay_href = elem.attr('lay-href');
        if(lay_href.indexOf("http")==0) {
            //遇到绝对地址在新页签中打开
            elem.attr("target","_blank").attr("href", lay_href);
        }else {
            $('#frmMain').attr('src', CTX + '/' + lay_href);
        }
        //左侧菜单加载
        loadSideMenu.call(this);
    })
    ;




    layui.element.on('nav(layadmin-system-side-menu)', function(o){
        var elem = $(o);
        var ev = elem.attr('lay-event');
        var href = elem.attr('lay-href');
        if($('#lay-app').hasClass('layadmin-side-shrink')){
            $('#lay-app').removeClass('layadmin-side-shrink');
            $('#laybtn-shrink').removeClass('layui-icon-spread-left').addClass('layui-icon-shrink-right');
        }

        if($.trim(href) != ''){
            var src = CTX + '/' + href;
            if(href.indexOf("http")==0){
                src = href;
            }
            $('#frmMain').attr('src', src);
        }else{
            //layer.msg('功能正在开发中，敬请期待。。。');
        }

    });


    //如果没有指定url参数，就默认触发第一个顶部菜单菜单，如果有指定参数，就触发指定参数对应的顶部菜单。
    var topcode = $.curlparam("tcode");
    var index= topcode?-1:0; //默认第一个
    $('.nav_catalog').each(function(i){
        if(index>-1){
            var cat = $(this).find(".catalog");
            if(cat.attr('lay-href').indexOf("http")!=0) {
                cat.click();
                return false;
            }
        }
        var code = $(this).data("code");
        if(topcode && code && topcode==code){
            $(this).find(".catalog").click();
            return false;
        }
    });
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


function loadSideMenu(){
    var catUrl = $(this).attr('lay-href');
    var o = $(this).parent();
    var catCode = $(o).data("code");
    var catId = $(o).attr('data-id');
    var catName = $(this).text();

    if(catUrl.indexOf("http")==0){ return ;}

    $(".side .side-logo h1").html(catName);
    if(catCode == 'okr') {
        $.ajax({
            url: CTX + '/prot/project/okrmenu',
            type: "POST",
            cache: false,
            async: false,
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                __opentop_loading();
            },
            error: function (xhr, status, e) {
                layer.msg('发送AJAX请求到"' + this.url + '"时出错[' + xhr.status + ']：' + e)
            },
            complete: function (XMLHttpRequest, textStatus) {
                __closetop_loading();
            },
            success: function (data) {
                var mmsg = __iserrors(data);
                if (mmsg == '') {
                    var pro_all_list = data.all_list;
                    var jxdeptList = data.jxdeptList;
                    var gldeptList = data.gldeptList;



                    $('.side .side-first').remove();
                    $('.side .child').remove();

                    var html = [
                        '<div class="side-first sidemenu" data-id="side1">',
                        '   <div class="side-icon"><img src="'+CSTATIC+'/img/indeximg/school.png" alt=""></div>',
                        '   <div class="side-name">校级目标</div>',
                        '   <div><img class="side-arrow turn-left" src="'+CSTATIC+'/img/indeximg/down-arrow.png" alt=""></div>',
                        '</div>',
                        '<div class="child" data-pid="side1" id="side1-childs">',
                        '   <div class="side-second sidemenu" id="side1-1"  data-url="prot/wbs/37a71b8951724d61be6fbf145979d27b/overview">',
                        '       <div class="side-name">2019学校目标</div>',
                        '   </div>',

                        '   <div class="side-second sidemenu" id="side1-2" data-url="prot/wbs/81185f4820b04c32a66d1a90de824310/overview">',
                        '       <div class="side-name">2018学校目标</div>',
                        '   </div>',

                        '   <div class="side-second sidemenu side-second-haschild" id="side1-3">',
                        '       <div class="side-icon"><img class="side-arrow turn-left" src="'+CSTATIC+'/img/indeximg/down-arrow-fill.png" alt=""></div>',
                        '       <div class="side-name">专题目标</div>',
                        '   </div>',
                        '   <div class="child" id="side1-3-childs">',
                        '       <div class="side-third sidemenu" data-url="prot/wbs/72d66e9bfb4243c68998de3aaeefc499/overview">',
                        '          <div class="side-block"></div>',
                        '           <div class="side-name" title="国家级优质高等职业院校建设目标任务">优质校目标</div>',
                        '       </div>',
                        '       <div class="side-third sidemenu" data-url="prot/wbs/3c5f2864552d43c882e9e410ec1db3a0/overview">',
                        '          <div class="side-block"></div>',
                        '           <div class="side-name" title="河南省高校信息化发展水平评估指标体系（试行）任务">信息化发展评估</div>',
                        '       </div>',
                        '       <div class="side-third sidemenu" data-url="prot/wbs/8c0f92270ce3491794632ce4693d440e/overview">',
                        '          <div class="side-block"></div>',
                        '           <div class="side-name" title="创新创业工作考核">创新创业规划</div>',
                        '       </div>',
                        '       <div class="side-third sidemenu" data-url="prot/wbs/2b4519c6b30a47bfa74e8b372779aa88/overview">',
                        '          <div class="side-block"></div>',
                        '           <div class="side-name" title="全国文明单位创建工作资料任务">文明单位创建</div>',
                        '       </div>',
                        '   </div>',

                        '   <div class="side-second sidemenu side-second-haschild" id="side1-4">',
                        '       <div class="side-icon"><img class="side-arrow turn-left" src="'+CSTATIC+'/img/indeximg/down-arrow-fill.png" alt=""></div>',
                        '       <div class="side-name">部门目标</div>',
                        '   </div>',
                        '   <div class="child" id="side1-4-childs">',
                        '       <div class="side-third sidemenu" id="side1-4-1" data-url="prot/protdeptview?dtype=gl">',
                        '           <div class="side-block"></div>',
                        '           <div class="side-name">党政及教辅部门</div>',
                        '       </div>',
                        '       <div class="side-third sidemenu" id="side1-4-2" data-url="prot/protdeptview?dtype=jx">',
                        '           <div class="side-block"></div>',
                        '           <div class="side-name">教学单位</div>',
                        '       </div>',
                        '   </div>',

                        '</div>',

                        <!-- 教学目标 -->
                        '<div class="side-first sidemenu" id="side2">',
                        '<div class="side-icon"><img src="'+CSTATIC+'/img/indeximg/teach.png" alt=""></div>',
                        '<div class="side-name">教学目标</div>',
                        '<div><img class="side-arrow turn-left" src="'+CSTATIC+'/img/indeximg/down-arrow.png" alt=""></div>',
                        '</div>',

                        '<div class="child" id="side2-childs" data-url="">',
                        '   <a class="side-second sidemenu" data-url="prot/wbs/34b234c23cc740db88e807f850844fd1/overview">',
                        '       <div class="side-name">专业目标</div>',
                        '   </a>',
                        '   <a class="side-second sidemenu" data-url="http://sub.yrcti.edu.cn/system/sso/login.html">',
                        '       <div class="side-name">课程目标</div>',
                        '   </a>',
                        '</div>',


                        '<div class="side-first sidemenu" id="side3">',
                        '   <div class="side-icon"><img src="'+CSTATIC+'/img/indeximg/personal.png" alt=""></div>',
                        '   <div class="side-name">个人目标</div>',
                        '   <div><img class="side-arrow turn-left" src="'+CSTATIC+'/img/indeximg/down-arrow.png" alt=""></div>',
                        '</div>',

                        '<div class="child" id="side3-childs" data-url="">',
                        '   <a class="side-second sidemenu" data-url="http://hr.yrcti.edu.cn/teacher/target">',
                        '       <div class="side-name">教师</div>',
                        '   </a>',
                        '   <a class="side-second sidemenu" data-url="http://stu.yrcti.edu.cn/studevelopcore/sso/login.html">',
                        '      <div class="side-name">学生</div>',
                        '   </a>',
                        '</div>',

                        '<div class="side-first sidemenu" data-url="prot/project/list">',
                        '   <div class="side-icon"><img src="'+CSTATIC+'/img/indeximg/tool.png" alt=""></div>',
                        '   <div class="side-name">OKR工具</div>',
                        '   <div><img class="side-arrow turn-left" src="'+CSTATIC+'/img/indeximg/down-arrow.png" alt=""></div>',
                        '</div>'

                    ];




                   /*
                    $.each(list, function(i, item){
                        html.push(
                            '<div class="side-first" id="" data-url="'+$.trim(item.url)+'">',
                            '   <div class="side-icon"><img src="" alt=""></div>',
                            '   <div class="side-name">'+item.name+'</div>',
                            '   <div><img class="side-arrow turn-down" src="'+CSTATIC+'/img/indeximg/down-arrow.png" alt=""></div>',
                            '</div>'
                        );
                    });
                    */

                    $('.side').append(html.join(""));
                    $(".side .child").hide();







                    /*
                    if (catCode == 'okr' && pro_all_list.length > 0) {
                        for (var ii = 0; ii < pro_all_list.length; ii++) {
                            var thisp = pro_all_list[ii];
                            tmpstr += '<div class="index-nav-project" data-proid="' + thisp.id + '" onclick="into_project(this, \'' + thisp.id + '\')">';
                            tmpstr += '<div class="layui-inline left-icon" title="' + thisp.name + '"></div>';
                            tmpstr += '<div class="layui-inline right-text">' + thisp.name + '</div>';
                            tmpstr += '</div>';
                        }
                    }


                    if (catCode == 'okr') {
                        var cproid = $.curlparam("cproid");
                        $(".index-nav-project").each(function (i) {
                            var proid = $(this).data("proid");
                            if (cproid == proid) {
                                $(this).trigger("click");
                            }
                        });
                    }
                    */
                } else {
                    layer.msg(mmsg, {icon: 5});
                }
            }
        });
    }
    else {
        $.ajax({
            url: CTX + '/system/menu/' + catId + '/mymenu',
            type: "GET",
            cache: false,
            async: true,
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                __opentop_loading();
            },
            error: function (xhr, status, e) {
                layer.msg('发送AJAX请求到"' + this.url + '"时出错[' + xhr.status + ']：' + e)
            },
            complete: function (XMLHttpRequest, textStatus) {
                __closetop_loading();
            },
            success: function (data) {
                var mmsg = __iserrors(data);
                if (mmsg == '') {

                    $('.side .side-first').remove();
                    $('.side .child').remove();

                    var list = data.data;
                    var html = [];
                    $.each(list, function(i, item){
                        html.push(
                            '<div class="side-first" id="" data-url="'+$.trim(item.url)+'">',
                            '   <div class="side-icon"></div>', /*img标签作为图标不合适*/
                            '   <div class="side-name">'+item.name+'</div>',
                            '   <div><img class="side-arrow turn-left" src="'+CSTATIC+'/img/indeximg/down-arrow.png" alt=""></div>',
                            '</div>'
                        );
                    });


                    $('.side').append(html.join(""));
                    $(".side .child").hide();

                } else {
                    layer.msg(mmsg, {icon: 5});
                }
            }
        });
    }


}
