package edu.sdu.chatroom.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.sdu.chatroom.entity.User;
import edu.sdu.chatroom.service.UserService;

@RestController
public class LoginController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(String name, String password, HttpSession session) {

		User user = userService.findByName(name);

		if (user == null) {
			user = userService.findByEmail(name);
			if (user == null) {
				return "error1";
			}
		}

		if (!user.getPassword().equals(password)) {
			return "error2";
		}
		session.setAttribute("name", user.getName());
		if (user.isAdmin()) {
			session.setAttribute("isAdmin", true);
		}
		return "success";
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

}
