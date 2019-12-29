package com.xy.cr.shiro;

import lombok.Data;

import java.io.Serializable;

/**
 * @description 自定义Authentication对象，使得Subject除了携带用户的登录名外还可以携带更多信息
 */
@Data
public class ShiroUser implements Serializable {

	private static final long serialVersionUID = 2422573216503344237L;

	private int id;

	private String userName;

	private String realName;

	private String deptId;

	private String deptNo;

	private String deptJcName;

	private String deptQcName;

	private String ip;
	
	private String rid;





    /**
	 * 作为默认的<shiro:principal/>输出.
	 */
	@Override
	public String toString() {
		return this.getUserName();
	}

}
