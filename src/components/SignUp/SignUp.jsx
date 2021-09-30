import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import './SignUp.scss';

function SignUp({onLogin, onSignUp}) {
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
      <h1>Регистрация</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          autoComplete='off'
          type='text'
          placeholder='userName'
          value={login}
          onChange={handleLoginChange}
        />
        <input
          autoComplete='on'
          type='password'
          placeholder='password'
          value={pass}
          onChange={handlePassChange}
        />
        <input type='submit' />
      </form>
    </Container>
  );
}
export default SignUp;
