/**
 * @Description: 字典配置
 * @version 1.8.2
 * @License：MIT
 */
layui.fsDict = {
		statusDict:{
			formatType : "local",
			labelField : "name",
			valueField : "code",
			spaceMode : " ",//展示多个数据分隔符，默认,
			data:[{"code":"0","name":"正常","css":""},
				{"code":"1","name":"禁用","style":"color:red"}]
		},
        modtype:{
            formatType : "local",
            labelField : "name",
            valueField : "code",
            spaceMode : " ",//展示多个数据分隔符，默认,
            data:[{"code":"1","name":"人员调整","css":""},
                {"code":"2","name":"预算调整","css":""}]
        },
        optype : {
            formatType : "local",
            labelField : "name",
            valueField : "id",
            spaceMode : "",//展示多个数据分隔符，默认,
            data:[{"id":"1","name":"登录"},
                {"id":"2","name":"文件下载"}]
        },
        istop : {
            formatType : "local",
            labelField : "name",
            valueField : "id",
            spaceMode : "",//展示多个数据分隔符，默认,
            data:[{"id":"0","name":"普通"},
                  {"id":"1","name":"置顶"}]
        },
        
        //账户冻结状态
        status : {
            formatType : "local",
            labelField : "name",
            valueField : "id",
            spaceMode : "",//展示多个数据分隔符，默认,
            data:[{"id":"0","name":"正常"},
                  {"id":"1","name":"冻结","style":"color:#F00;"}]
        },
        month : {
            formatType : "local",
            labelField : "name",
            valueField : "id",
            spaceMode : "",//展示多个数据分隔符，默认,
            data:[
                {"id":"01","name":"一月"},
                {"id":"02","name":"二月"},
                {"id":"03","name":"三月"},
                {"id":"04","name":"四月"},
                {"id":"05","name":"五月"},
                {"id":"06","name":"六月"},
                {"id":"07","name":"七月"},
                {"id":"08","name":"八月"},
                {"id":"09","name":"九月"},
                {"id":"10","name":"十月"},
                {"id":"11","name":"十一月"},
                {"id":"12","name":"十二月"}
            ]
        },
		//部门
        dept : {
			formatType : "server",
			loadUrl : CTX + "/system/get/dept",
			method : "get",
			inputs : "parentid:0",
			labelField : "name",
			valueField : "id"
		},
		//领导
		manage : {
		    formatType : "server",
		    loadUrl : CTX + "/system/dept/manage",
		    method : "get",
		    inputs : "parentid:0",
		    labelField : "rname",
		    valueField : "id"
		},
		//角色
		role : {
		    formatType : "server",
		    loadUrl : CTX + "/system/role/dict",
		    method : "get",
		    inputs : "parentid:0",
		    labelField : "name",
		    valueField : "id"
		},
		//经办人
		jbr : {
		    formatType : "server",
		    loadUrl :  CTX + '/system/dict/jbr',
		    method : "get",
		    inputs : "parentid:0",
		    labelField : "rname",
		    valueField : "id"
		},
		//项目
		project : {
            formatType : "server",
            loadUrl :  CTX + '/dict/project',
            method : "get",
            inputs : "parentid:0",
            labelField : "name",
            valueField : "id"
        } ,
        table : {
            formatType : "local",
            labelField : "name",
            valueField : "id",
            spaceMode : "",//展示多个数据分隔符，默认,
            data:[
                {"id":"f_agent","name":"分管领导"},
                {"id":"f_manage","name":"经办人"},
                {"id":"sys_budget","name":"预算"},
                {"id":"sys_dept","name":"部门修改"}
                
            ]
        },
        user : {
            formatType : "server",
            loadUrl :  CTX + '/system/user/all',
            method : "get",
            inputs : "parentid:0",
            labelField : "rname",
            valueField : "id"
        },
        companyStatus : {
        	formatType : "local",
            labelField : "name",
            valueField : "id",
            spaceMode : "",//展示多个数据分隔符，默认,
            data:[
            	{"id":"0","name":"审核中"},
            	{"id":"1","name":"审核通过"},
            	{"id":"2","name":"审核不通过"}
            ]
        },
        //企业
        company : {
			formatType : "server",
			loadUrl : CTX + "/system/get/company",
			method : "get",
			inputs : "parentid:0",
			labelField : "name",
			valueField : "id"
		}	
};
