import { useDispatch } from 'react-redux';
import { appendAnecdote } from '../reducers/anecdoteReducer.js';
import { toggleNotification } from "../reducers/notificationReducers.js";
import anecdoteService from '../services/anecdotes.js'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const newAnecdote = async (e) => {
        e.preventDefault()
        const anecdote = e.target.anecdote.value
        e.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(anecdote)
        dispatch(appendAnecdote(newAnecdote))
        dispatch(toggleNotification(`anecdote ${anecdote} has been created`))
    }

    return <>
        <h2>create new</h2>
        <form onSubmit={newAnecdote}>
            <div><input name={'anecdote'} /></div>
            <button type={'submit'}>create</button>
        </form>
    </>
}

export default AnecdoteForm
