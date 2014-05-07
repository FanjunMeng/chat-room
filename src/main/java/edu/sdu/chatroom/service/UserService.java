package edu.sdu.chatroom.service;

import java.util.List;

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

	@Transactional(readOnly = true)
	public List<User> find(int startIndex) {
		return userDAO.find(startIndex);
	}

	@Transactional
	public void insert(User user) {
		userDAO.insert(user);
	}

	@Transactional
	public void updateIconPathByName(String name, String targetName) {
		userDAO.updateIconPathByName(name, targetName);
	}

	@Transactional
	public void updatePasswordByName(String name, String newPassword) {
		userDAO.updatePasswordByName(name, newPassword);
	}

	@Transactional
	public void deleteByName(String name) {
		userDAO.deleteByName(name);
	}

	public UserDAO getUserDAO() {
		return userDAO;
	}

	public void setUserDAO(UserDAO userDAO) {
		this.userDAO = userDAO;
	}
}
