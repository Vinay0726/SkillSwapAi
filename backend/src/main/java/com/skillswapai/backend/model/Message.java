package com.skillswapai.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String senderClerkId; // Clerk ID of sender
    private String content;
    private LocalDateTime timeStamp = LocalDateTime.now();

//    @ManyToOne
//    @JoinColumn(name = "room_id")
//    private Room room;
    @ManyToOne
    @JoinColumn(name = "room_id")
    @JsonBackReference
    private Room room;

    public Message(String senderClerkId, String content, Room room) {
        this.senderClerkId = senderClerkId;
        this.content = content;
        this.room = room;
        this.timeStamp = LocalDateTime.now();
    }
}
