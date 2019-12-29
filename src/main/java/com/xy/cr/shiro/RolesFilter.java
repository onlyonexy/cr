package com.xy.cr.shiro;


import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.AccessControlFilter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public class RolesFilter extends AccessControlFilter {

	private String noRolesUrl;

	public String getNoRolesUrl() {
		return noRolesUrl;
	}

	public void setNoRolesUrl(String noRolesUrl) {
		this.noRolesUrl = noRolesUrl;
	}

	@Override
	protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
		String pers[] = (String[]) mappedValue;
		if (pers == null || pers.length <= 0) {
			return true;
		}
		Subject subject = SecurityUtils.getSubject();
		for (String p : pers) {
			if (subject.hasRole(p)) {
				return true;
			}
		}
		return false;
	}

	@Override
	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		String path = httpRequest.getContextPath();
		String basePath = httpRequest.getScheme() + "://" + httpRequest.getServerName() + ":" + httpRequest.getServerPort() + path + "/";
		boolean isAjax = isAjax(httpRequest);
		if (isAjax) {
			httpResponse.setCharacterEncoding("UTF-8");
			PrintWriter writer = httpResponse.getWriter();
//			RespRes o = RespRes.create();
//			writer.write(o.toString());
			return false;
		}
		httpResponse.sendRedirect(basePath + getNoRolesUrl());
		return false;
	}

	public static boolean isAjax(HttpServletRequest request) {
		boolean ajax = "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
		String ajaxFlag = null == request.getParameter("ajax") ? "false" : request.getParameter("ajax");
		boolean isAjax = ajax || ajaxFlag.equalsIgnoreCase("true");
		return isAjax;
	}

}
