package edu.sdu.chatroom.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class SecurityInterceptor extends HandlerInterceptorAdapter {

	Log log = LogFactory.getLog(this.getClass());

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		// 登录、注册页面不不判断
		if ("/login".equals(request.getRequestURI())
				|| "/registry".equals(request.getRequestURI())
				|| "/checkEmail".equals(request.getRequestURI())
				|| "/checkName".equals(request.getRequestURI())
				|| "/iconUpload".equals(request.getRequestURI())) {
			return true;
		}
		HttpSession session = request.getSession();
		// 未登录
		if (session.getAttribute("name") == null) {
			log.info("request:" + request.getRequestURI()
					+ "   redirect to login");
			if ("/".equals(request.getRequestURI())) {
				response.sendRedirect("/loginPage.html");
			} else {
				response.sendError(500);
			}
			return false;
		}

		// 非管理员
		if (request.getRequestURI().startsWith("/users")) {
			if (session.getAttribute("isAdmin") == null) {
				response.sendError(500);
				return false;
			}
		}
		request.getMethod();
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		super.postHandle(request, response, handler, modelAndView);
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		super.afterCompletion(request, response, handler, ex);
	}

	@Override
	public void afterConcurrentHandlingStarted(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		// TODO Auto-generated method stub
		super.afterConcurrentHandlingStarted(request, response, handler);
	}

}
