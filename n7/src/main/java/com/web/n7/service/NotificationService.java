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

    /**
     * Creates and sends a notification to a specific user. The notification includes
     * details such as title, message, type, and the user it is associated with.
     * This method also saves the notification in the database.
     *
     * @param user   the user who will receive the notification
     * @param title  the title of the notification
     * @param message the message content of the notification
     * @param type   the type of the notification
     * @return the saved Notification object
     */
    public Notification sendNotification(User user, String title, String message, NotificationType type) {
        // Créer et enregistrer la notification dans la base de données
        Notification notification = new Notification();
        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setRead(false);
        notification.setType(type);
        notification.setCreatedAt(LocalDateTime.now());

        return notificationRepository.save(notification);
    }



    /**
     * Sends an email with the specified recipient, subject, and body content.
     *
     * @param to the email address of the recipient
     * @param subject the subject of the email
     * @param body the body content of the email
     */
    private void send(String to, String subject, String body) {
        /*TO DO*/

    }

    /**
     * Retrieves a list of notifications for a specific user based on their user ID.
     *
     * @param userId the ID of the user whose notifications are to be retrieved
     * @return a list of notifications associated with the specified user
     */
    public List<Notification> findByUser(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    /**
     * Retrieves a list of unread notifications for a specified user.
     *
     * @param userId the ID of the user whose unread notifications are to be retrieved
     * @return a list of unread notifications associated with the specified user
     */
    public List<Notification> findUnreadByUser(Long userId) {
        return notificationRepository.findByUserIdAndIsRead(userId, false);
    }

    /**
     * Marks a notification as read by updating its read status to true.
     * If the notification does not exist, an exception is thrown.
     *
     * @param notificationId the ID of the notification to be marked as read
     * @return the updated notification object after being marked as read
     * @throws RuntimeException if the notification is not found
     */
    public Notification markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification non trouvée"));

        notification.setRead(true);
        return notificationRepository.save(notification);
    }

    /**
     * Marks all notifications as read for the given user.
     *
     * This method retrieves all unread notifications for the specified user
     * and updates their status to "read" in the database.
     *
     * @param userId the ID of the user whose notifications will be marked as read
     */
    public void markAllAsRead(Long userId) {
        List<Notification> unreadNotifications = notificationRepository.findByUserIdAndIsRead(userId, false);

        for (Notification notification : unreadNotifications) {
            notification.setRead(true);
            notificationRepository.save(notification);
        }
    }

    /**
     * Deletes a notification with the specified ID from the repository.
     *
     * @param notificationId the ID of the notification to delete
     */
    public void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }

    /**
     * Deletes all notifications for a specific user by their user ID.
     * This method retrieves all notifications associated with the given user ID
     * and removes them from the database.
     *
     * @param userId the unique identifier of the user whose notifications are to be deleted
     */
    public void deleteAllForUser(Long userId) {
        List<Notification> userNotifications = notificationRepository.findByUserId(userId);
        notificationRepository.deleteAll(userNotifications);
    }

    /**
     * Sends a bulk notification to a list of users.
     * Each user in the provided list will receive the specified title, message, and notification type.
     *
     * @param users the list of users to whom notifications will be sent
     * @param title the title of the notification
     * @param message the message body of the notification
     * @param type the type of the notification (e.g., COMPETITION_REGISTRATION, MATCH_REMINDER, etc.)
     */
    public void sendBulkNotification(List<User> users, String title, String message, NotificationType type) {
        for (User user : users) {
            sendNotification(user, title, message, type);
        }
    }

    /**
     * Sends reminders for upcoming matches happening within the next 24 hours.
     *
     * This method should be triggered by a task scheduler to process and notify
     * users of matches they are involved in or subscribed to. The implementation
     * should include fetching relevant match information, determining the users
     * to notify, and sending the appropriate notifications.
     */
    public void sendMatchReminders() {
        // Cette méthode pourrait être appelée par un planificateur de tâches
        // pour rappeler les matches à venir dans les prochaines 24 heures
        // Logique d'implémentation à définir
    }
}