package com.xy.cr.controller;


import com.xy.cr.entity.UserVip;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
@Slf4j
public class HomeController {
    @Autowired
    private HttpServletRequest request;



    @RequestMapping("system/login")
    public  String login(){
        return "login";
    }

    @RequestMapping("index")
    public  String index(){
        return "index";
    }
    /**
     * <a href="${ctx}/vip/register">会员注册</a>
     * <a href="${ctx}/vip/get">会员查询</a>
     * <a href="${ctx}/vip/manage">会员管理</a>
     */
    @RequestMapping("vip/register")
    public  String vipRegister(){
        UserVip userVip = new UserVip();
       // userVip.setId(3);
        request.setAttribute("user", userVip);
        return "vip/register";
    }
    @RequestMapping("vip/user")
    public  String vipGet(){
        return "vip/user";
    }
    @RequestMapping("vip/manage")
    public  String vipManage(){
        return "vip/manage";
    }
}
