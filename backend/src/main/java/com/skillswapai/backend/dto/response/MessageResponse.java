package com.skillswapai.backend.dto.response;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MessageResponse {
    private String sender;
    private String content;
    private LocalDateTime timeStamp;

    public MessageResponse(String sender, String content, LocalDateTime timeStamp) {
        this.sender = sender;
        this.content = content;
        this.timeStamp = timeStamp;
    }

    public MessageResponse() {
    }

}
