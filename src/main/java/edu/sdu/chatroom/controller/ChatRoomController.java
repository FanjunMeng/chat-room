package edu.sdu.chatroom.controller;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import edu.sdu.chatroom.entity.Message;

@Controller
public class ChatRoomController {

	@MessageMapping("chatRoom/{chatRoomId}")
	public Message chatRoom(@DestinationVariable int chatRoomId, Message message) {
		return message;
	}

}
