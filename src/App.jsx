import { useState } from 'react'
import notificationsData from './notifications'
import './App.css'

// Wrapper component: renders notification content via children
function NotificationItem({ children, onClear }) {
  return (
    <li className="notification-item">
      <div className="notification-content">{children}</div>
      <button type="button" className="btn-clear" onClick={onClear}>
        清除
      </button>
    </li>
  )
}

function App() {
  // Use the imported notification data as the initial state
  const [notifications, setNotifications] = useState(notificationsData)

  // Clear a single notification
  function clearNotification(id) {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  // Clear all notifications
  function clearAll() {
    setNotifications([])
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Notifications</h1>
        {/* Display the current notification count at the top */}
        <p className="count">通知总数：{notifications.length}</p>
        {notifications.length > 0 && (
          <button type="button" className="btn-clear-all" onClick={clearAll}>
            清除所有
          </button>
        )}
      </header>

      {notifications.length === 0 ? (
        <p className="empty">暂无通知</p>
      ) : (
        <ul className="notification-list">
          {/* Loop through all notifications in state */}
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              onClear={() => clearNotification(notification.id)}
            >
              {/* Pass sender name and message content via children */}
              <h2 className="notification-name">{notification.name}</h2>
              <p className="notification-message">{notification.message}</p>
            </NotificationItem>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
