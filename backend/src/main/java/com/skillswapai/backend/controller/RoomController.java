package com.skillswapai.backend.controller;

import com.skillswapai.backend.dto.response.MessageResponse;
import com.skillswapai.backend.dto.response.RoomDTO;
import com.skillswapai.backend.dto.response.RoomResponse;
import com.skillswapai.backend.model.Message;
import com.skillswapai.backend.model.Room;
import com.skillswapai.backend.repository.RoomRepository;
import com.skillswapai.backend.repository.MessageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {
    private final RoomRepository roomRepository;
    private final MessageRepository messageRepository;

    public RoomController(RoomRepository roomRepository, MessageRepository messageRepository) {
        this.roomRepository = roomRepository;
        this.messageRepository = messageRepository;
    }

    // Create or find room for 2 users
    @PostMapping("/get-or-create")
    public ResponseEntity<RoomResponse> getOrCreateRoom(@RequestBody Map<String, String> payload) {
        String userA = payload.get("userA");
        String userB = payload.get("userB");
        if (userA == null || userB == null)
            return ResponseEntity.badRequest().build();
        String roomId = Room.generateRoomId(userA, userB);
        Optional<Room> optionalRoom = roomRepository.findByRoomId(roomId);
        Room room = optionalRoom.orElseGet(() -> {
            Room newRoom = new Room();
            newRoom.setRoomId(roomId);
            newRoom.setParticipantA(userA);
            newRoom.setParticipantB(userB);
            return roomRepository.save(newRoom);
        });

        return ResponseEntity.ok(
                new RoomResponse(room.getRoomId(), null, null, null)
        );
    }

    // Get all rooms for a user (list of rooms where they're a participant)
    @GetMapping("/user/{clerkId}")
    public ResponseEntity<List<RoomResponse>> getRoomsByUser(@PathVariable String clerkId) {
        List<Room> rooms = roomRepository.findByParticipantAOrParticipantB(clerkId, clerkId);
        List<RoomResponse> resp = rooms.stream().map(r -> new RoomResponse(
                r.getRoomId(), null, null, null
        )).collect(Collectors.toList());
        return ResponseEntity.ok(resp);
    }

    // Get all messages in a room as DTO
    @GetMapping("/{roomId}/messages")
    public ResponseEntity<RoomDTO> getMessages(@PathVariable String roomId) {
        Room room = roomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new NoSuchElementException("Room not found"));
        List<MessageResponse> messageDTOs = room.getMessages().stream().sorted(Comparator.comparing(Message::getTimeStamp))
                .map(m -> new MessageResponse(m.getSenderClerkId(), m.getContent(), m.getTimeStamp()))
                .collect(Collectors.toList());
        return ResponseEntity.ok(new RoomDTO(roomId, messageDTOs));
    }
}
