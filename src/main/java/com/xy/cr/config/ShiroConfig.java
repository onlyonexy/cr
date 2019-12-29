package com.xy.cr.config;

import com.xy.cr.shiro.CustomHashedCredentialsMatcher;
import com.xy.cr.shiro.SystemRealm;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.LinkedHashMap;
import java.util.Map;

@Configuration
public class ShiroConfig {

    @Value("${uploadFile.resourceHandler}")
    private String resourceHandler;
	@Bean
	public  CredentialsMatcher credentialsMatcher(){
		CustomHashedCredentialsMatcher b = new CustomHashedCredentialsMatcher();
		b.setHashAlgorithmName("md5");
		return b;
	}
	@Bean
	public SystemRealm myShiroRealm() {
		SystemRealm myShiroRealm = new SystemRealm();
		myShiroRealm.setCredentialsMatcher(credentialsMatcher());
		return myShiroRealm;
	}
	@Bean
	public SecurityManager securityManager() {
		DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
		securityManager.setRealm(myShiroRealm());
		return securityManager;
	}
	@Bean
	public ShiroFilterFactoryBean shiroFilterFactoryBean(SecurityManager securityManager) {
		ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
		shiroFilterFactoryBean.setSecurityManager(securityManager);
		Map<String,String> map = new LinkedHashMap<>();
		//登出
		map.put("/system/logout","logout");
		map.put("/system/login","anon");
		map.put("/static/**","anon");
		//对所有用户认证
		map.put("/user/dologin", "anon");
        map.put("/templates/script/**", "anon");
        map.put(resourceHandler.substring(0, resourceHandler.lastIndexOf("/")) + "/**","anon");
        map.put("/miniapp/api/**","anon");
        map.put("/**","authc");
		//登录
		shiroFilterFactoryBean.setLoginUrl("/system/login");
		//首页
		//shiroFilterFactoryBean.setSuccessUrl("/system/index");
		//错误页面，认证不通过跳转
		shiroFilterFactoryBean.setUnauthorizedUrl("/error");
		shiroFilterFactoryBean.setFilterChainDefinitionMap(map);

		/*Map<String, Filter> filterMap = new LinkedHashMap();
		//自定义filter 使用new的方式创建对象。
		shiroFilterFactoryBean.setFilters(filterMap);*/
		return shiroFilterFactoryBean;
	}

	//加入注解的使用，不加入这个注解不生效
	@Bean
	public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(SecurityManager securityManager) {
		AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
		authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
		return authorizationAttributeSourceAdvisor;
	}
}