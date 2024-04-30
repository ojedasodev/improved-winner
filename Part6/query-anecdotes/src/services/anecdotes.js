import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const fetchAnecdotes = () =>
	axios.get(baseUrl).then(res => res.data)

const create = (anecdote) => {
	const payload = {
		content: anecdote,
		votes: 0,
	}
	return axios.post(baseUrl, payload)
}

const update = (anecdote) => {
	return axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
}

export default {
	fetchAnecdotes,
	create,
	update
}
