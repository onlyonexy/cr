// 数据
// 党政及教辅部门
var dangzhengjiaofu = [
  {
    name: "党政办公室",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "党委组织部（机关党总支）",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "党委宣传部（统战部、文明办、 新闻中心）",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "纪委（监察处）",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "学生工作部（学生处、学生资助 管理中心）",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "教师工作部（人事处、教师发展中心）",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "保卫部（保卫处、武装部）",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "离退休党总支（离退休工作处）",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "教务处（质量管理办公室）",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "计划财务处",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "审计处",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "工会",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "团委",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "科技处",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "国有资产管理处",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "对外联络与合作处",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "创新创业学院",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "工发展规划处（高等职业教育研究室）会",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "招生就业服务中心",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "图书馆（档案馆、校史馆）",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "学报编辑部",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "教育教学督导室",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "信息化管理办公室（大数据管理中心）",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "基本建设办公室",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "资产经营管理中心",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "后勤管理服务中心",
    weidu: 3,
    zhikong: 203,
    url: ""
  }
];
//教学单位
var jiaoxuedanwei = [
  {
    name: "水利工程学院",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "土木与交通工程学院",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "测绘工程学院",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "机械工程学院",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "国际教育学院（外语教学部）",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "电气工程学院",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "金融与会计学院",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "商务与管理学院",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "环境工程学院",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "信息工程学院",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "旅游学院",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "艺术与设计学院（艺术教育中心）",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "马克思主义学院",
    weidu: 3,
    zhikong: 203
  }, {
    name: "继续教育学院",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "基础部",
    weidu: 3,
    zhikong: 203,
    url: ""
  }, {
    name: "体育部",
    weidu: 3,
    zhikong: 203,
    url: ""
  }
];

function createChart(sideData) {
  var option = {
    series: [
      {
        type: 'pie',
        color: ["#53b4ff", "#ecf1fd"],
        radius: ['80%', '100%'],
        avoidLabelOverlap: false,
        hoverAnimation: false,
        label: {
          normal: {
            show: true,
            position: 'center',
            formatter: "{d}%"
          },
          emphasis: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: true
          }
        },
        data: [
          {
            value: 86,
            label: {
              show: true,
              emphasis: {
                show: true
              }
            }
          },
          {
            value: 100 - 86,
            label: {
              show: false
            }
          },
        ]
      }
    ]
  };
  for (var i in sideData) {
    var myChart = echarts.init($(".chart")[i]);
    myChart.setOption(option);
  }
}

var sidebar = {
  // 受菜单栏操控的iframe元素id
  contentEle: "",
  // 控制开关（需要为每个有子级的元素设置，id：元素的id，switch：开关项）
  sideswitch: [
    { switch: false, id: "side1" },
    { switch: false, id: "side2" },
    { switch: false, id: "side3" },
    { switch: false, id: "side4" },
    { switch: false, id: "side1-3" },
    { switch: false, id: "side1-4" },
  ],
  // 获取页面的url参数
  getParam: function (paramName) {
    paramValue = "", isFound = !1;
    if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
      arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("&"), i = 0;
      while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
  },
  // 创建右侧选择框（为党政及教辅部门以及教学单位提供）
  createSideSelectBox(sideData) {
    var html = [];
    for (var i in sideData) {
      if(sideData[i].url){
        html.push('<div class="side-selectbox-box" onclick="sidebar.jump(' + sideData[i].url + ')">');
      }else{
        html.push('<div class="side-selectbox-box">');
      }
      html.push('<div class="side-selectbox-name">' + sideData[i].name + '</div>');
      html.push('<div class="side-selectbox-content">');
      html.push('<span><div class="blue">' + sideData[i].weidu + '</div><div>维度</div></span>');
      html.push('<span><div class="red">' + sideData[i].zhikong + '</div><div>质控点</div></span>');
      html.push('</div><div class="chart"></div></div>');
    }
    $("#side-selectbox").html(html.join(""));
    createChart(sideData);//创建图表
  },
  // 开关控制函数
  sideOpenAndClose(name) {
    var _this = this;
    $("#" + name).click(function () {
      _this.changeSwitch(name);
    })
  },
  // 开关转换
  changeSwitch: function (name) {
    for (var i in this.sideswitch) {
      if (this.sideswitch[i].id === name) {
        if (this.sideswitch[i].switch) {
          $("#" + name + "-childs").hide();
          console.log("." + name + "-arrow")
          $("." + name + "-arrow").attr("class", name + "-arrow turn-left");
        } else {
          $("#" + name + "-childs").show();
          $("." + name + "-arrow").attr("class", name + "-arrow turn-down");
        }
        this.sideswitch[i].switch = !this.sideswitch[i].switch;
      }
    }
  },
  openSide: function () {
    var sideParam = this.getParam("side");
    if (sideParam) {
      var side = sideParam.split("-");
      if (side[0]) {
        $("#" + side[0] + "-childs").show();
        $("." + side[0] + "-arrow").attr("class", side[0] + "-arrow turn-down");
        this.changeSwitch(side[0]);
      }
      if (side[1]) {
        $("#" + side[0] + "-" + side[1] + "-childs").show();
        $("." + side[0] + "-" + side[1] + "-arrow").attr("class", side[0] + "-" + side[1] + "-arrow turn-down");
        this.changeSwitch(side[0] + "-" + side[1]);
      }
      if (side[2]) {
        $("#" + side[0] + "-" + side[1] + "-" + side[2]).attr("class", "side-third side-cur");
      }
    }
  },
  // 初始化
  init: function (contentEle) {
        var _this = this;
        this.contentEle = contentEle;
        // 将所有子元素隐藏
        $(".child").hide();
      /*
        // 将右侧辅助选择框隐藏
        $("#side-selectbox").hide()
        // 为有子级的元素设置开关
        this.sideOpenAndClose("side1");
        this.sideOpenAndClose("side2");
        this.sideOpenAndClose("side3");
        this.sideOpenAndClose("side4");
        this.sideOpenAndClose("side1-3");
        this.sideOpenAndClose("side1-4");
        this.openSide();
      */




    $(".side").on("click",".sidemenu",function(){
        var expand = $(this).data("expand");
        var child = $(this).next(".child");
        var this_arrow = $(this).find(".side-arrow");
        if(!!expand){/*展开时*/
            child.hide();
            $(this_arrow).removeClass("turn-down").addClass("turn-left");
        }
        else{/*折叠时*/
            child.show();
            $(this_arrow).removeClass("turn-left").addClass("turn-down");
        }
        $(this).data("expand",!expand);
    });




    // 第三级点击事件
    $(".side").on("click",".side-third", function () {
        if ($(".side-cur").length>0) {
            $(".side-cur").removeClass("side-cur");
        }
        $(this).addClass("side-cur");



        var url = this.getAttribute("data-url");
        if (url) {
            _this.jump(this, url);
        }

    });
    // 第二级点击事件
    $(".side").on("click",".side-second",function () {

        if ($(".side-cur").length>0) {
            $(".side-cur").removeClass("side-cur");
        }
        $(this).addClass("side-cur");

        var url = this.getAttribute("data-url");
        if (url) {
            _this.jump(this, url);
        }
    });



    $(".side").on("click",".side-first",function(){

        if ($(".side-cur").length>0) {
            $(".side-cur").removeClass("side-cur");
        }
        $(this).addClass("side-cur");

        var url = $(this).data("url");
        if (url) {
            _this.jump(this, url);
        }

    });



  },
  // iframe跳转事件
  jump: function (elem, url) {

      if(url.indexOf("http")==0) {
          debugger;
          $(elem).attr("target","_blank").attr("href",url);
      }
      else {
          var href = CTX + '/' + url;
          $("#" + this.contentEle).attr("src", href);
      }

  }
}