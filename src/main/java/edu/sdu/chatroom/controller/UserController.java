package edu.sdu.chatroom.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.sdu.chatroom.entity.User;
import edu.sdu.chatroom.service.UserService;

@RestController
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/currentUser", method = RequestMethod.GET)
	public User currentUser(HttpSession session) {
		String nameOrEmail = "";
		if (session.getAttribute("name") != null) {
			nameOrEmail = (String) session.getAttribute("name");
		}
		User user = userService.findByName(nameOrEmail);
		if (user == null) {
			user = userService.findByEmail(nameOrEmail);
		}
		if (user != null) {
			user.setPassword("");
			return user;
		}
		return null;
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

}
