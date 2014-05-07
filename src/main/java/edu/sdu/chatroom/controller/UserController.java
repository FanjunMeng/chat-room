package edu.sdu.chatroom.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.web.bind.annotation.PathVariable;
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

	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public List<User> users(int startIndex) {
		return userService.find(startIndex);
	}

	@RequestMapping(value = "/users/{name}", method = RequestMethod.POST)
	public String users(@PathVariable String name, String email,
			String password, boolean isAdmin) {
		userService.insert(new User(email, name, password, isAdmin));
		return "success";
	}

	@RequestMapping(value = "/users/{name}", method = RequestMethod.DELETE)
	public String users(@PathVariable String name) {
		userService.deleteByName(name);
		return "success";
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

}
