// eslint-disable-next-line react/prop-types
const Notification = ({message}) => {
    // eslint-disable-next-line react/prop-types
    if(message.message){
        return <div className={`message ${message.type === "error" ? "error" : "success"}`}>
            <h2>{message.message}</h2>
        </div>
    }
    return null
}

export default Notification;