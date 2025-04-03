package com.web.n7.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Data
public class UserRegisterRequest {
    @Email
    @NotBlank(message = "Email est obligatoire")
    private String email;

    @NotBlank(message = "Password est obligatoire")
    private String password;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    private String userName;
    private String phoneNumber;
    private String role;
}