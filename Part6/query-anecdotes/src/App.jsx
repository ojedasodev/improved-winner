import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from './services/anecdotes'
import { useNotificationDispatch } from './context/notificationContext'

const App = () => {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.update,
    onSuccess: (response) => {
      const updatedAnecdote = JSON.parse(response.data)
      const notes = queryClient.getQueryData(['anecdotes']).map(anecdote => {
        if (anecdote.id == updatedAnecdote.id) {
          return updatedAnecdote
        }
        return anecdote
      })
      queryClient.setQueryData(['anecdotes'], notes)
    },
    onError: (response) => {
      console.log(response)
    }
  })
  const notificationDispatch = useNotificationDispatch()
  const handleVote = (anecdote) => {
    console.log('vote')
    anecdote.votes += 1
    updateAnecdoteMutation.mutate(anecdote)
    notificationDispatch({
      message: `anecdote ${anecdote.content} has been voted`,
      show: true
    })
  }

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: anecdoteService.fetchAnecdotes,
      retry: false,
      refetchOnWindowFocus: false
    }
  )

  if (result.isError) {
    return <div>anecdotes service not available due to problems in server</div>
  }

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
