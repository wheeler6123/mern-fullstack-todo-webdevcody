import React from 'react'
import loginRequest from '../api/loginRequest'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../App'

const LoginPage = () => {

    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')
    const [token, setToken] = React.useContext(TokenContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        loginRequest(password)
            .then(({token}) => {
                setToken(token);
                navigate('/');
            }).catch(err => {
                setError(err.message)
            });
    }

  return (
    <div>
        <h1>Login</h1>
        <div style={{color: 'red' }}>{error}</div>
        <form onSubmit={handleLogin}>
            <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
            />
            <button>Login</button>
        </form>
    </div>
  )
}

export default LoginPage