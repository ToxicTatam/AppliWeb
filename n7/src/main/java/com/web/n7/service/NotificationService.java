package com.web.n7.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.web.n7.model.Notification;
import com.web.n7.model.User;
import com.web.n7.model.enumeration.NotificationType;
import com.web.n7.repository.NotificationRepository;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;


    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;

    }

    public Notification sendNotification(User user, String title, String message, NotificationType type) {
        // Créer et enregistrer la notification dans la base de données
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setRead(false);
        notification.setType(type);
        notification.setCreatedAt(LocalDateTime.now());

        Notification savedNotification = notificationRepository.save(notification);

        // Envoyer également un email si l'utilisateur a une adresse email
        if (user.getEmail() != null && !user.getEmail().isEmpty()) {
            try {
                /*TO DO*/
            } catch (Exception e) {
                // Logger l'erreur mais ne pas bloquer le processus si l'email échoue
                System.err.println("Erreur lors de l'envoi de l'email à " + user.getEmail() + ": " + e.getMessage());
            }
        }

        return savedNotification;
    }

    private void send(String to, String subject, String body) {
        /*TO DO*/

    }

    public List<Notification> findByUser(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    public List<Notification> findUnreadByUser(Long userId) {
        return notificationRepository.findByUserIdAndIsRead(userId, false);
    }

    public Notification markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification non trouvée"));

        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    public void markAllAsRead(Long userId) {
        List<Notification> unreadNotifications = notificationRepository.findByUserIdAndIsRead(userId, false);

        for (Notification notification : unreadNotifications) {
            notification.setRead(true);
            notificationRepository.save(notification);
        }
    }

    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }

    public void deleteAllForUser(Long userId) {
        List<Notification> userNotifications = notificationRepository.findByUserId(userId);
        notificationRepository.deleteAll(userNotifications);
    }

    public void sendBulkNotification(List<User> users, String title, String message, NotificationType type) {
        for (User user : users) {
            sendNotification(user, title, message, type);
        }
    }

    public void sendMatchReminders() {
        // Cette méthode pourrait être appelée par un planificateur de tâches
        // pour rappeler les matches à venir dans les prochaines 24 heures
        // Logique d'implémentation à définir
    }
}