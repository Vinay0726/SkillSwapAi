package com.skillswapai.backend.repository;

import com.skillswapai.backend.model.Message;
import com.skillswapai.backend.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByRoom(Room room);
}
