package edu.sdu.chatroom.controller;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.sdu.chatroom.entity.Room;
import edu.sdu.chatroom.service.RoomService;

@RestController
public class RoomController {

	Map<Integer, Set<String>> roomNameMap = new ConcurrentHashMap<Integer, Set<String>>();

	@Autowired
	private RoomService roomService;

	@RequestMapping(value = "/rooms", method = RequestMethod.GET)
	public List<Room> rooms() {
		return roomService.find();
	}

	@RequestMapping(value = "/rooms/{roomId}", method = RequestMethod.GET)
	public Room getRoomById(@PathVariable int roomId) {
		return roomService.findByRoomId(roomId);
	}

	@RequestMapping(value = "/rooms/{roomId}", method = RequestMethod.PUT)
	public String updateRoomCurrentSize(@PathVariable int roomId, String name,
			int addOrRemoveAPelple) {
		if (roomNameMap.get(roomId) == null) {
			roomNameMap.put(roomId, new CopyOnWriteArraySet<String>());
		}
		Set<String> namesInRoom = roomNameMap.get(roomId);
		if (addOrRemoveAPelple == 1 && namesInRoom.add(name)) {
			roomService.updateRoomCurrentSizeByRoomId(roomId,
					addOrRemoveAPelple);
		}
		if (addOrRemoveAPelple == -1 && namesInRoom.remove(name)) {
			roomService.updateRoomCurrentSizeByRoomId(roomId,
					addOrRemoveAPelple);
		}
		return "success";
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
