package com.xy.cr.utils;

import java.io.File;

public class Constant {

    /**
     * 初始密码
     */
    public static final String password = "123456";

    /**
     * 文件上传路径
     */
    public static final String UPLOAD_ROOT_PATH = "uploads";
    
    /**
     * 微信 用户类型 学校老师
     */
    public static final String user_type_teacher = "1";

    /***
     *微信  用户类型--企业指导老师
     */
    public static final String user_type_campany_teacher = "2";
    
    /**
     * 微信 用户类型--学生
     */
    public static final String user_type_student = "3";
    
    /**
     * 微信 用户类型--家长
     */
    public static final String user_type_guardian = "4";
    
    /**
     * 系统用户-管理员
     */
    public static final String sys_user_admin = "1";
    
    /**
     * 系统用户-院部领导
     */
    public static final String sys_user_dept = "2";
    /**
     * 系统用户-学校指导老师
     */
    public static final String sys_user_teacher = "3";
    
    /**
     * 微信首页展示通知限制
     */
    public static final int wx_notice_limit = 5;
    
    /**
     * 审核中
     */
    public static final int wx_sh = 0;
    
    /**
     * 审核通过
     */
    public static final int sh_pass = 1;
    
    /*/*
     * 毕业生年度字段
     */
    public static final String year_key = "graduation";


    /**
     * excel 模板文件位置
     */
    public static final String model_excel = "static/model" + File.separator + "mode.xlsx";

    /**
     *操作类型文件下载
     */
    public static final String op_type_load = "2";
}
