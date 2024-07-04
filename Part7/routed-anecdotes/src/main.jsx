import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { NotificationContextProvider } from './context/notificationContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </Router>
)
