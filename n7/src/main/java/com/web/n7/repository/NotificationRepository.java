package com.web.n7.repository;

import com.web.n7.model.Notification;
import com.web.n7.model.enumeration.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserId(Long userId);
    List<Notification> findByUserIdAndIsRead(Long userId, boolean isRead);
    List<Notification> findByType(NotificationType type);
}