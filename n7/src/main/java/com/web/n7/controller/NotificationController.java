package com.web.n7.controller;

import com.web.n7.model.Notification;
import com.web.n7.service.NotificationService;
import com.web.n7.util.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    /**
     * Retrieve all notifications for the authenticated user.
     */
    @GetMapping("/me")
    public ResponseEntity<List<Notification>> getMyNotifications(@AuthenticationPrincipal UserDetails userDetails) {
        Long userId = ((CustomUserDetails) userDetails).getId();
        List<Notification> notifications = notificationService.findByUser(userId);
        return ResponseEntity.ok(notifications);
    }

    /**
     * Retrieve all unread notifications for the authenticated user.
     */
    @GetMapping("/me/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications(@AuthenticationPrincipal UserDetails userDetails) {
        Long userId = ((CustomUserDetails) userDetails).getId();
        List<Notification> unreadNotifications = notificationService.findUnreadByUser(userId);
        return ResponseEntity.ok(unreadNotifications);
    }

    /**
     * Mark a specific notification as read.
     */
    @PutMapping("/{notificationId}/read")
    public ResponseEntity<Notification> markNotificationAsRead(@PathVariable Long notificationId) {
        Notification notification = notificationService.markAsRead(notificationId);
        return ResponseEntity.ok(notification);
    }

    /**
     * Mark all notifications as read for the authenticated user.
     */
    @PutMapping("/me/read-all")
    public ResponseEntity<Void> markAllNotificationsAsRead(@AuthenticationPrincipal UserDetails userDetails) {
        Long userId = ((CustomUserDetails) userDetails).getId();
        notificationService.markAllAsRead(userId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Delete a specific notification.
     */
    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long notificationId) {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Delete all notifications for the authenticated user.
     */
    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteAllNotificationsForUser(@AuthenticationPrincipal UserDetails userDetails) {
        Long userId = ((CustomUserDetails) userDetails).getId();
        notificationService.deleteAllForUser(userId);
        return ResponseEntity.noContent().build();
    }
}