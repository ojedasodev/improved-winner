import { useMutation, useQueryClient } from "@tanstack/react-query"
import anecdoteService from '../services/anecdotes.js'
import { useNotificationDispatch } from "../context/notificationContext.jsx"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const newAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess(response) {
      const newAnecdote = response.data
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatch({ message: `anecdote ${content} has been created`, show: true })
    },
    onError: (response) => {
      notificationDispatch({
        message: response.response.data.error,
        show: true
      })
    }
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
