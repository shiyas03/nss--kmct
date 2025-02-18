import React, { useEffect, useState } from 'react';
import API from '../services/api';

const Notification = ({ user }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await API.get('/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error.response?.data?.msg || error.message);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      setNotifications(notifications.map((n) => (n._id === id ? { ...n, read: true } : n)));
    } catch (error) {
      console.error('Failed to mark notification as read:', error.response?.data?.msg || error.message);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id} style={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
              <p>{notification.message}</p>
              {!notification.read && (
                <button onClick={() => handleMarkAsRead(notification._id)}>Mark as Read</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications found.</p>
      )}
    </div>
  );
};

export default Notification;