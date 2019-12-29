package com.xy.cr.config;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;
import com.alibaba.druid.support.http.StatViewServlet;
import com.alibaba.druid.support.http.WebStatFilter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;

import javax.sql.DataSource;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/*@Configuration*/
public class DataSourceConfig {
	/**
	 * 将自定义的 Druid 数据源添加到容器中，不再让 Spring Boot 自动创建
	 * 这样做的目的是：绑定全局配置文件中的 druid 数据源属性到 com.alibaba.druid.pool.DruidDataSource
	 * 从而让它们生效
	 *
	 * @return
	 * @throws Exception 
	 * @ConfigurationProperties(prefix = "spring.datasource")：作用就是将 全局配置文件中 前缀为 spring.datasource
	 * 的属性值注入到 com.alibaba.druid.pool.DruidDataSource 的同名参数中
	 */
	@ConfigurationProperties(prefix = "spring.datasource")
	@Bean
	public DataSource druidDataSource() throws Exception {
	    Map<String, Object> map = new HashMap();
	    map.put("initConnectionSqls","SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;");
	    DataSource dataSource = DruidDataSourceFactory.createDataSource(map);
		return new DruidDataSource();
	}

	/**
	 * 配置 Druid 监控 之  管理后台的 Servlet
	 * 内置 Servler 容器时没有web.xml 文件，所以使用 Spring Boot 的注册 Servlet 方式
	 */
	@Bean
	public ServletRegistrationBean statViewServlet() {
		ServletRegistrationBean bean = new ServletRegistrationBean(new StatViewServlet(), "/druid/*");
		Map<String, String> initParams = new HashMap<>();
		initParams.put("loginUsername", "admin");
		initParams.put("loginPassword", "123456");
		initParams.put("allow", "");
		/*initParams.put("deny", "192.168.1.20");*/

		/** 设置初始化参数*/
		bean.setInitParameters(initParams);
		return bean;
	}
	/**
	 * 配置 Druid 监控 之  web 监控的 filter
	 * WebStatFilter：用于配置Web和Druid数据源之间的管理关联监控统计
	 */
	@Bean
	public FilterRegistrationBean webStatFilter() {
		FilterRegistrationBean bean = new FilterRegistrationBean();
		bean.setFilter(new WebStatFilter());

		/** exclusions：设置哪些请求进行过滤排除掉，从而不进行统计*/
		Map<String, String> initParams = new HashMap<>();
		initParams.put("exclusions", "*.js,*.css,/druid/*");
		bean.setInitParameters(initParams);

		/** "/*" 表示过滤所有请求*/
		bean.setUrlPatterns(Arrays.asList("/*"));
		return bean;
	}

}
