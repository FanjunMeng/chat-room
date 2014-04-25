package edu.sdu.chatroom.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.sdu.chatroom.service.UserService;

@RestController
public class LogoutController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String login(HttpSession session) {
		session.removeAttribute("name");
		return "success";
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

}
