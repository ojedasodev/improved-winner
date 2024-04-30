import { useNotificationDispatch, useNotificationValue } from '../context/notificationContext'
import { useEffect } from 'react'

const Notification = () => {
  const { message, show } = useNotificationValue()
  const dispatch = useNotificationDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    if (show) {
      let timer = setTimeout(() => {
        dispatch({
          message: '',
          show: false
        })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message, show])

  if (!show) return null

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
