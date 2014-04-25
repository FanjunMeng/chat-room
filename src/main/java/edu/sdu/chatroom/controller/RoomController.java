package edu.sdu.chatroom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.sdu.chatroom.entity.Room;
import edu.sdu.chatroom.service.RoomService;

@RestController
public class RoomController {

	@Autowired
	private RoomService roomService;

	@RequestMapping(value = "/rooms", method = RequestMethod.GET)
	public List<Room> rooms() {
		return roomService.find();
	}

	@RequestMapping(value = "/rooms", method = RequestMethod.POST)
	public Room addRoom(String title, int capacity) {
		Room room = roomService.findByTitle(title);
		if (room != null) {
			return null;
		}
		roomService.insert(new Room(title, capacity));
		return roomService.findByTitle(title);
	}

	public RoomService getRoomService() {
		return roomService;
	}

	public void setRoomService(RoomService roomService) {
		this.roomService = roomService;
	}
}
