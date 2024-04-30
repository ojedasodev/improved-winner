import { useReducer, createContext, useContext } from "react";

const notificationReducer = (state, action) => {
	return {
		message: action.message,
		show: action.show
	}
}

const notificationContext = createContext()

export const useNotificationValue = () => {
	const notificationAndDispatch = useContext(notificationContext)
	return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
	const notificationAndDispatch = useContext(notificationContext)
	return notificationAndDispatch[1]
}
export const NotificationContextProvider = (props) => {
	const [message, messageDispatch] = useReducer(notificationReducer, {
		message: '',
		show: false
	})

	return (
		<notificationContext.Provider value={[message, messageDispatch]}>
			{props.children}
		</notificationContext.Provider>
	)
}

export default notificationContext
