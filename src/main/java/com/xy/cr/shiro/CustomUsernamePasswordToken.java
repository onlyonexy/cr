package com.xy.cr.shiro;

import org.apache.shiro.authc.UsernamePasswordToken;

public class CustomUsernamePasswordToken extends UsernamePasswordToken {

	private static final long serialVersionUID = -8712996706132925218L;

	public CustomUsernamePasswordToken() {
		super();
	}

	public CustomUsernamePasswordToken(String username, String password, boolean rememberMe, String host, String loginType, String captchaCode) {
		// 调用父类的构造函数
		super(username, password, rememberMe, host);
		this.loginType = loginType;
		this.captchaCode = captchaCode;
	}

	// 登陆类型:"sys"系统登陆,"sso"单点登录系统对接
	private String loginType;

	// 用于存储用户输入的校验码
	private String captchaCode;

	public String getLoginType() {
		return loginType;
	}

	public void setLoginType(String loginType) {
		this.loginType = loginType;
	}

	public String getCaptchaCode() {
		return captchaCode;
	}

	public void setCaptchaCode(String captchaCode) {
		this.captchaCode = captchaCode;
	}

}
