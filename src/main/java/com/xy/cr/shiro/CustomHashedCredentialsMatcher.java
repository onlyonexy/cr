package com.xy.cr.shiro;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;

public class CustomHashedCredentialsMatcher extends HashedCredentialsMatcher {

	@Override
	public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
		CustomUsernamePasswordToken custom_token = (CustomUsernamePasswordToken) token;
		String login_type = custom_token.getLoginType();
		if ("sso".equalsIgnoreCase(login_type)) {
			return true;
		}
		return super.doCredentialsMatch(token, info);
	}

}
