// eslint-disable-next-line react/prop-types
// eslint-disable-next-line react/prop-types
import PropTypes from 'prop-types'

const Notification = ({ message }) => {

  if(message.message){
    return <div className={`message ${message.type === 'error' ? 'error' : 'success'}`} data-testid='messagebox' >
      <h2>{message.message}</h2>
    </div>
  }
  return null
}

Notification.propTypes = {
  message: PropTypes.object.isRequired
}

export default Notification