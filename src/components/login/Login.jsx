import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import './login.scss';

function Login({ onLogin, onSignUp }) {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };
  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin('');
    setPass('');
    if (!!onLogin) {
      onLogin(login, pass);
    } else {
      onSignUp(login, pass);
    }
  };
  return (
    <Container>
      <h1>Войти в чат</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        {/* <input type='text' placeholder='userName' value={login} onChange={handleLoginChange} /> */}
        <TextField
          id='outlined-basic'
          label='userName'
          variant='outlined'
          value={login}
          size='small'
          onChange={handleLoginChange}
        />
        <TextField
          type='password'
          id='outlined-basic'
          label='password'
          variant='outlined'
          value={pass}
          size='small'
          onChange={handlePassChange}
        />

        <input className='btn-login' type='submit' />
      </form>
    </Container>
  );
}
export default Login;
