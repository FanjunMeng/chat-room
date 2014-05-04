package edu.sdu.chatroom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import edu.sdu.chatroom.dao.UserDAO;
import edu.sdu.chatroom.entity.User;

@Component
public class UserService {

	@Autowired
	private UserDAO userDAO;

	@Transactional(readOnly = true)
	public User findByName(String name) {
		return userDAO.findByName(name);
	}

	@Transactional(readOnly = true)
	public User findByEmail(String email) {
		return userDAO.findByEmail(email);
	}
	
	@Transactional
	public void insert(User user) {
		userDAO.insert(user);
	}
	
	public UserDAO getUserDAO() {
		return userDAO;
	}

	public void setUserDAO(UserDAO userDAO) {
		this.userDAO = userDAO;
	}
	
}
