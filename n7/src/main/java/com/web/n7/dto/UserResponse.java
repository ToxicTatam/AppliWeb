package com.web.n7.dto;

import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String email;
    private String userName;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String role;
    private String profilePicture;
    private String createdAt;
    private String updatedAt;
}