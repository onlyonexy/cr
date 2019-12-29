package com.xy.cr.shiro;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;


/**
 * shiro鉴权工具类
 */
public class ShiroUtil {

	public static ShiroUtil create() {
		return new ShiroUtil();
	}

	/**
	 * 获取shiro subject
	 * 
	 * @return
	 */
	public static Subject getShiroSubject() {
		Subject subject = null;
		try {
			subject = SecurityUtils.getSubject();
		}catch (Exception e) {
			
		}
		return subject;
		
	}

	/**
	 * 获取当前登录人对象
	 * 
	 * @return
	 */
	public static ShiroUser getOnlineUser() {
		Subject subject = getShiroSubject();
		if(subject == null) {
			return new ShiroUser();//主要为了防止后续调用出错。
		}
		else {
			return (ShiroUser) getShiroSubject().getPrincipal();
		}
	}

	/**
	 * 获取当前登录人用户id
	 * 
	 * @return
	 */
	public static int getOnlineUserId() {
		ShiroUser user = getOnlineUser();
		return user == null ? null: user.getId();
	}

	public static String getOnlineUserIp() {
		return getShiroSubject().getSession().getHost();
	}

	public static String getOnlineUserDeptId() {
		return getOnlineUser().getDeptId();
	}

	/**
	 * 判断当前登陆人是否具备某几个角色
	 * 
	 * @param roleCodes
	 * @return
	 */
	public static boolean hasAnyRoles(String... roleCodes) {
		Subject subject = getShiroSubject();
		if (subject != null) {
			for (String role : roleCodes) {
				if (subject.hasRole(role.trim())) {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 判断当前登录人是否具备某个角色
	 * 
	 * @param roleCode
	 * @return
	 */
	public static boolean hasRole(String roleCode) {
		Subject subject = getShiroSubject();
		if (subject != null) {
			if (subject.hasRole(roleCode.trim())) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 判断数据创建人是否是当前登录人
	 * 
	 * @param create_uid
	 * @return
	 */
//	public static boolean isMeCreate(int create_uid) {
//		if (StringUtils.hasText(create_uid)) {
//			int me_uid = getOnlineUserId();
//			return me_uid == create_uid;
//		}
//		return false;
//	}

}
