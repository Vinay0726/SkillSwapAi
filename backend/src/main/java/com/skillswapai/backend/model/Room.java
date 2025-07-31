package com.skillswapai.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true) // e.g. hash of both clerkIds, alphabetical
    private String roomId;

    // For 1-on-1 chat rooms, store each participant's Clerk ID
    @Column(nullable = false)
    private String participantA; // clerkId

    @Column(nullable = false)
    private String participantB; // clerkId

//    @OneToMany(mappedBy = "room", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    private Set<Message> messages = new HashSet<>();
@OneToMany(mappedBy = "room", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
@JsonManagedReference
private Set<Message> messages = new HashSet<>();


    // Utility to generate a unique roomId for 2 users (order-invariant)
    public static String generateRoomId(String clerkId1, String clerkId2) {
        // Ensure both IDs are at least 3 characters long
        String a = clerkId1.length() >= 3 ? clerkId1.substring(clerkId1.length() - 3) : clerkId1;
        String b = clerkId2.length() >= 3 ? clerkId2.substring(clerkId2.length() - 3) : clerkId2;

        // To have a deterministic order ("abcxyz" == "xyzabc"), sort the two strings
        if (a.compareTo(b) < 0)
            return a + b;
        else
            return b + a;
    }

}
