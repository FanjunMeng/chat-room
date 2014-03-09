package edu.sdu.chatroom.controller;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(String name, String password, HttpSession session) {
		if (name.equals(password)) {
			session.setAttribute("name", name);
			return "success";
		}
		return "error";
	}

}
