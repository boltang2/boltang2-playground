package com.example.dev.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class GoogleUser {
    private String email;
    private String name;
    private String picture;

    public List<String> getRoles() {
        return List.of("ROLE_USER");
    }
}
