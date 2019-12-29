package com.xy.cr.shiro;


import cn.hutool.core.convert.Convert;
import com.xy.cr.entity.User;
import com.xy.cr.service.UserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

public class SystemRealm extends AuthorizingRealm {

	@Autowired
	private UserService userService;

	/*@Autowired
	private UserRoleService userRoleService;*/

	/**
	 * 认证回调函数,登录时调用.
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
		CustomUsernamePasswordToken token = (CustomUsernamePasswordToken) authcToken;
		String username = token.getUsername(); // 用户名
		SimpleAuthenticationInfo authenticationInfo = null;
		if (StringUtils.hasText(username)) {
			User user = userService.findByName(username);
			if (user == null) {
				throw new UnknownAccountException();
			}
			if (user.getStatus() == 0) {
				throw new LockedAccountException();
			}
			ShiroUser shiroUser = new ShiroUser();
			shiroUser.setId(user.getId());
			shiroUser.setUserName(user.getUserName());
			shiroUser.setRealName(user.getRealName());
			shiroUser.setIp(token.getHost());
		    // 加这一步的目的是在Post请求的时候会先进认证，然后在到请求
	        // if (token.getPrincipal() == null) {
	        // return null;
	        // }
	        // 获取用户信息
	        Object principal = token.getPrincipal();
	        if (principal != null) {
	            username = Convert.toStr(principal);
	        }
			authenticationInfo = new SimpleAuthenticationInfo(shiroUser, user.getPassword(), getName());
		}

		return authenticationInfo;
	}

	/**
	 * 授权查询回调函数, 进行鉴权但缓存中无用户的授权信息时调用.
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection p) {
		ShiroUser shiroUser = (ShiroUser) p.getPrimaryPrincipal();
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
		//Set<String> roles = new HashSet<>(userRoleService.findCodeByUser(shiroUser.getId()));
		//info.addRoles(roles);
		// 根据用户名查询当前用户权限
        //Set<String> permissions = userRoleService.findPermissionsByUser(shiroUser.getId());
        // 将权限名称提供给info
        //info.setStringPermissions(permissions);
		return info;
	}

}
