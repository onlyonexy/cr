package com.xy.cr.controller;

import cn.hutool.core.lang.Dict;
import cn.hutool.log.Log;
import cn.hutool.log.LogFactory;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.xy.cr.entity.User;
import com.xy.cr.service.UserService;
import com.xy.cr.shiro.CustomUsernamePasswordToken;
import com.xy.cr.utils.Constant;
import com.xy.cr.utils.RequestUtil;
import com.xy.cr.utils.ResponseVo;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("user")
@Slf4j
public class UserController {
    @Autowired
    private HttpServletRequest request;

    @Autowired
    private UserService userService;
    @GetMapping("get/user")
    public ResponseVo test(){
        ResponseVo res = ResponseVo.create();
        Integer pageNo = Integer.valueOf(request.getParameter("pageNo"));
        Integer pageSize = Integer.valueOf(request.getParameter("pageSize"));
        System.out.println("----- selectAll method test ------");
        IPage<User> page = new Page<>(pageNo, pageSize);
        IPage<User> userList = userService.getUserByCondition(page);
        log.info("{}",userList);
        return res;
    }

    @RequestMapping(value = "/dologin")
    public String login() {
        JSONObject json = new JSONObject();
        Dict params = RequestUtil.req2Map(request);
        log.info("用户登录参数:" + params);
        int flag = 0;
        String msg = "";
        String uname = params.getStr("name");
        String upass = params.getStr("pwd");
        try {
            Subject currentUser = SecurityUtils.getSubject();
            currentUser.login(new CustomUsernamePasswordToken(uname, upass, false, request.getRemoteHost(), "", null));
            if (currentUser.isAuthenticated()) {
                // 登陆成功
                String ip = RequestUtil.getIpAddress();
               // JSONObject re = this.requestMessage(request);
               // String op_content = "登录方式：普通登录," + "用户登录ip:" + ip + "," + re.toString();
              //  logService.insertLog(ShiroUtil.getOnlineUserId(), op_content, Constant.op_type_login);
            }
        } catch (UnknownAccountException e) {
            msg = "用户不存在";
            flag = 1;
        } catch (IncorrectCredentialsException e) {
            msg = "密码错误";
            flag = 1;
        } catch (LockedAccountException e) {
            msg = "您没有权限";
            flag = 1;
        } catch (AuthenticationException e) {
            flag = 1;
            msg = "登陆失败";
        }
        String url = "login";
        try {

            url ="index";
        } catch (Exception e) {
            e.printStackTrace();
        }
        json.put("msg", msg);
        json.put("error", flag);
        json.put("url", url);
        return json.toString();
    }
}
