import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const formOnSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <>
      <form onSubmit={formOnSubmit}>
        <div>
                    username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm