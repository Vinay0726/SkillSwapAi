package com.skillswapai.backend.controller;

import com.skillswapai.backend.dto.request.MessageRequest;
import com.skillswapai.backend.model.Message;
import com.skillswapai.backend.model.Room;
import com.skillswapai.backend.repository.MessageRepository;
import com.skillswapai.backend.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    private final RoomRepository roomRepository;
    private final MessageRepository messageRepository;

    @Autowired
    public ChatController(RoomRepository roomRepository, MessageRepository messageRepository) {
        this.roomRepository = roomRepository;
        this.messageRepository = messageRepository;
    }

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(@DestinationVariable String roomId, MessageRequest request) {
        Room room = roomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found!"));
        Message message = new Message(request.getSender(), request.getContent(), room);
        messageRepository.save(message);
        room.getMessages().add(message);
        roomRepository.save(room);
        return message;
    }
}
