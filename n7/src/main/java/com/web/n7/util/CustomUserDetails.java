package com.web.n7.util;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
public class CustomUserDetails implements UserDetails {

    private Long id;
    private String email;
    private String password;
    private String role;


    public CustomUserDetails(Long id, String email, String password, String role) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
    }


    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));

    }

//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return List.of(
//                new SimpleGrantedAuthority("ROLE_" + role),
//                new SimpleGrantedAuthority("USER_ID_" + id) // Ajouter une autorité spécifique à l'utilisateur
//        );
//    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}