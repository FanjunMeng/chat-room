package edu.sdu.chatroom.controller;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import edu.sdu.chatroom.entity.Message;
import edu.sdu.chatroom.service.UserService;

@Controller
public class ChatRoomController {

	@Autowired
	private UserService userService;

	String[] colors = { "#E51400", "#339933", "#1BA1E2", "#F09609", "#8CBF26",
			"#00ABA9", "#FF0097", "#E671B8", "#996600", " #A200FF" };
	int index = 0;

	Map<Integer, Map<String, String>> roomColorMap = new ConcurrentHashMap<Integer, Map<String, String>>();

	@MessageMapping("chatRoom/{chatRoomId}")
	public Message chatRoom(@DestinationVariable int chatRoomId, Message message) {
		if (message.getType() == Message.SYSTEM_MESSAGE) {
			return message;
		} else if (message.getType() == Message.USER_MESSAGE) {
			message.setBackgroundColor(getColors(chatRoomId, message));
			message.setIconPath(userService.findByName(message.getName())
					.getIconPath());
			return message;
		}
		return message;
	}

	private String getColors(int chatRoomId, Message message) {
		if (roomColorMap.get(chatRoomId) == null) {
			roomColorMap.put(chatRoomId,
					new ConcurrentHashMap<String, String>());
		}
		Map<String, String> userColorsMap = roomColorMap.get(chatRoomId);
		if (userColorsMap.get(message.getName()) == null) {
			synchronized (this) {
				String color = colors[index];
				index = (++index) % 10;
				userColorsMap.put(message.getName(), color);
			}
		}
		return userColorsMap.get(message.getName());
	}
}
