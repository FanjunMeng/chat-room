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

	@Transactional(readOnly = true)
	public List<Room> find(int startIndex) {
		return roomDAO.find(startIndex);
	}

	@Transactional(readOnly = true)
	public Room findByTitle(String title) {
		return roomDAO.findByTitle(title);
	}

	@Transactional(readOnly = true)
	public Room findByRoomId(int roomId) {
		return roomDAO.findByRoomId(roomId);
	}

	@Transactional
	public void insert(Room room) {
		roomDAO.insert(room);
	}

	@Transactional
	public void updateRoomCurrentSizeByRoomId(int roomId, int addOrRemoveAPelple) {
		Room room = roomDAO.findByRoomId(roomId);
		room.setCurrentSize(room.getCurrentSize() + addOrRemoveAPelple);
		roomDAO.updateByRoomId(room);
	}

	@Transactional
	public void deleteRoomById(int roomId) {
		roomDAO.deleteRoomById(roomId);
	}

	public RoomDAO getRoomDAO() {
		return roomDAO;
	}

	public void setRoomDAO(RoomDAO roomDAO) {
		this.roomDAO = roomDAO;
	}
}