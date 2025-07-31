package com.skillswapai.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RoomDTO {
    private String roomId;
    private List<MessageResponse> messages;

    public RoomDTO(String roomId, List<MessageResponse> messages) {
        this.roomId = roomId;
        this.messages = messages;
    }


}

