package edu.sdu.chatroom.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import edu.sdu.chatroom.dao.RoomDAO;
import edu.sdu.chatroom.entity.Room;


@Component
public class RoomService {

	@Autowired
	private RoomDAO roomDAO;

	@Transactional(readOnly = true)
	public List<Room> find() {
		return roomDAO.find();
	}

	public Room findByTitle(String title) {
		return roomDAO.findByTitle(title);
	}
	
	public void insert(Room room) {
		roomDAO.insert(room);
	}
	
	public RoomDAO getRoomDAO() {
		return roomDAO;
	}

	public void setRoomDAO(RoomDAO roomDAO) {
		this.roomDAO = roomDAO;
	}
	
}