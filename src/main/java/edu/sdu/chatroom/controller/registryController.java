package edu.sdu.chatroom.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.sdu.chatroom.entity.User;
import edu.sdu.chatroom.service.UserService;

@RestController
public class registryController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/checkEmail", method = RequestMethod.GET)
	public String checkEmail(String email) {
		if (userService.findByEmail(email) == null) {
			return "success";
		}
		return "error";
	}

	@RequestMapping(value = "/checkName", method = RequestMethod.GET)
	public String checkName(String name) {
		if (userService.findByName(name) == null) {
			return "success";
		}
		return "error";
	}

	@RequestMapping(value = "/registry", method = RequestMethod.POST)
	public String registry(String email, String name, String password) {
		userService.insert(new User(email, name, password, false));
		return "success";
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

}
