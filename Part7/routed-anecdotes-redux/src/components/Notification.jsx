import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    return notification
  })
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }


  if (!notification.show) return null

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
