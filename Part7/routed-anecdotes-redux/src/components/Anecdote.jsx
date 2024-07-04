import { Link, useMatch } from "react-router-dom"
const Anecdote = ({ anecdotes }) => {
  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(anecdote => Number(match.params.id) === anecdote.id) :
    null

  return (
    <>
      <Link to='/'>Home</Link>
      {anecdote && (
        <div>
          <h2>{anecdote.content}</h2>
          <div>has {anecdote.votes} votes</div>
        </div>)
      }
    </>)
}

export default Anecdote
