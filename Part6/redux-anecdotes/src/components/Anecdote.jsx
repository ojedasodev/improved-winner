import { useDispatch } from "react-redux";
import { likeAnecdote } from "../reducers/anecdoteReducer.js";
import { setNotification } from "../reducers/notificationReducers.js";

// eslint-disable-next-line react/prop-types
const Anecdote = ({ anecdote }) => {

    const dispatch = useDispatch()

    const vote = () => {
        console.log('vote', anecdote.id)
        dispatch(likeAnecdote({
            id: anecdote.id, anecdote: {
                content: anecdote.content,
                votes: anecdote.votes + 1
            }
        }))
        dispatch(setNotification({ message: `added vote on ${anecdote.content}`, duration: 10 }))
    }

    return <>
        <div>
            {/* eslint-disable-next-line react/prop-types */}
            {anecdote.content}
        </div>
        <div>
            {/* eslint-disable-next-line react/prop-types */}
            has {anecdote.votes}
            {/* eslint-disable-next-line react/prop-types */}
            <button onClick={() => vote()}>vote</button>
        </div>
    </>
}

export default Anecdote
