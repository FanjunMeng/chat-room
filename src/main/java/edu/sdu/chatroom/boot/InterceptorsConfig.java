package edu.sdu.chatroom.boot;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import edu.sdu.chatroom.interceptor.SecurityInterceptor;

@Configuration
public class InterceptorsConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new SecurityInterceptor());
	}
}
