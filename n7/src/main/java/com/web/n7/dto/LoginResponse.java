package com.web.n7.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String email;

}
