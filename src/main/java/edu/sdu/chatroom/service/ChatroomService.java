package edu.sdu.chatroom.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import edu.sdu.chatroom.dao.ChatroomDAO;
import edu.sdu.chatroom.entity.Chatroom;


@Component
public class ChatroomService {

	@Autowired
	private ChatroomDAO chatroomDAO;

	@Transactional(readOnly = true)
	public List<Chatroom> find() {
		return chatroomDAO.find();
	}

	public ChatroomDAO getChatroomDAO() {
		return chatroomDAO;
	}

	public void setChatroomDAO(ChatroomDAO chatroomDAO) {
		this.chatroomDAO = chatroomDAO;
	}

}