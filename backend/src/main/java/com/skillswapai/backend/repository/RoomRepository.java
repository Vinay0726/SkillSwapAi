package com.skillswapai.backend.repository;

import com.skillswapai.backend.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByRoomId(String roomId);

    // Find all rooms where this user is a participant
    List<Room> findByParticipantAOrParticipantB(String clerkId1, String clerkId2);
}
