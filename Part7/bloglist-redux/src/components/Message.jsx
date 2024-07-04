// eslint-disable-next-line react/prop-types
// eslint-disable-next-line react/prop-types
import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, show, type } = useSelector(({ notification }) => {
    return notification
  })
  if (!show) {
    return
  }

  return <div className={`message ${type === 'error' ? 'error' : 'success'}`} data-testid='messagebox' >
    <h2>{message}</h2>
  </div>
}

export default Notification
