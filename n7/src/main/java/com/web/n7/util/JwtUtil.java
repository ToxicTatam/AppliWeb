   package com.web.n7.util;

   import io.jsonwebtoken.Claims;
   import io.jsonwebtoken.JwtException;
   import io.jsonwebtoken.Jwts;
   import io.jsonwebtoken.SignatureAlgorithm;
   import io.jsonwebtoken.security.Keys;
   import jakarta.annotation.PostConstruct;
   import lombok.AllArgsConstructor;
   import lombok.Data;
   import lombok.RequiredArgsConstructor;
   import org.springframework.beans.factory.annotation.Value;
   import org.springframework.stereotype.Component;

   import javax.crypto.SecretKey;
   import java.security.Key;
   import java.util.Date;


   @Component
   @Data
   @AllArgsConstructor
   @RequiredArgsConstructor
   public class JwtUtil {

       @Value("${security.jwt.secret}")
       private String secretKey;

       @Value("${security.jwt.expiration}")
       private Long expirationTime;


       @Value("${security.jwt.algorithm}")
       private String algorithm;


       private  Key key;

       @PostConstruct
       public void init() {
           this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
       }




       public String generateToken(String email,Long userId ,String role) {
           return Jwts.builder()
                   .setSubject(email)
                   .claim("id", userId)
                   .claim("role", role)
                   .setIssuedAt(new Date())
                   .setExpiration(new Date(System.currentTimeMillis() +expirationTime ))
                   .signWith(key, SignatureAlgorithm.HS256)
                   .compact();
       }


       public String extractUsername(String token) {
           return Jwts.parserBuilder()
                   .setSigningKey(key)
                   .build()
                   .parseClaimsJws(token)
                   .getBody()
                   .getSubject();
       }

       public String extractEmail(String token) {
           return Jwts.parserBuilder()
                   .setSigningKey(key)
                   .build()
                   .parseClaimsJws(token)
                   .getBody()
                   .getSubject();
       }


       public boolean validateToken(String token) {
           try {
               Jwts.parserBuilder()
                       .setSigningKey(key)
                       .build()
                       .parseClaimsJws(token);
               return true;
           } catch (JwtException | IllegalArgumentException e) {
               return false;
           }
       }



   }