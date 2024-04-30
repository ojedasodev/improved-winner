import { useSelector } from 'react-redux';
import Anecdote from './Anecdote.jsx';

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
        if(filter !== ''){
            return anecdotes.filter(anecdote => anecdote.content.includes(filter))
        }
        return anecdotes
    })

    return <>
        {anecdotes.map(anecdote =>
            <Anecdote key={anecdote.id} anecdote={anecdote} />
        )}
    </>
}

export default AnecdoteList