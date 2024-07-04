import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { AnecdoteForm, AnecdoteList, About, Home } from './components'
import Anecdote from './components/Anecdote'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    dispatch(setNotification({
      message: `a new anecdote ${anecdote.content} created!`,
      duration: 10
    }))
    navigate('/anecdotes')
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Routes>
      <Route path='/' element={<Home />} >
        <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes} />} />
        <Route path={'/anecdotes'} element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path={'/about'} element={<About />} />
        <Route path={'/create'} element={<AnecdoteForm addNew={addNew} />} />
      </Route>
    </Routes>
  )
}

export default App
