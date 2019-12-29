package com.xy.cr.shiro;


import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.StringUtils;
import org.apache.shiro.web.filter.AccessControlFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.net.URLEncoder;

public class OnLineFilter extends AccessControlFilter {

    private static final Logger log = LoggerFactory.getLogger(OnLineFilter.class);

    private String noLoginUrl;

    public String getNoLoginUrl() {
        return noLoginUrl;
    }

    public void setNoLoginUrl(String noLoginUrl) {
        this.noLoginUrl = noLoginUrl;
    }

    @Override
    protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
        Subject subject = SecurityUtils.getSubject();
        if (subject.isAuthenticated()) {
            return true;
        }
        return false;
    }

    @Override
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String path = httpRequest.getContextPath();
        String basePath = httpRequest.getScheme() + "://" + httpRequest.getServerName() + ":" + httpRequest.getServerPort() + path + "/";
        boolean isAjax = RolesFilter.isAjax(httpRequest);
        if (isAjax) {
            PrintWriter writer = httpResponse.getWriter();
           /* RespRes o = RespRes.create();
            o.put("url", basePath + getNoLoginUrl());
            writer.print(o.toString());*/
            return false;
        }
        log.debug("账户尚未登录");
        String accessurl = httpRequest.getRequestURL().append(StringUtils.hasText(httpRequest.getQueryString()) ? ("?" + httpRequest.getQueryString()) : "").toString();
        String servername = httpRequest.getServerName();
        if (servername.equalsIgnoreCase("localhost")) {// 本地测试时不走单点登录
            httpResponse.sendRedirect(path + "/system/login");

        } else { // 正常跳转到单点登录地址
            httpResponse.sendRedirect(basePath + getNoLoginUrl() + "?accessurl=" + URLEncoder.encode(accessurl, "utf-8"));
        }
        return false;
    }

}
