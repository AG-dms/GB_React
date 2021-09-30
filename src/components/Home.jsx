/** @format */

import React, {useState} from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import './Home.scss';

function Home({onLogin, onSignUp}) {
  return (
    <Container>
      <div className='flex-container'>
        <h1>React-chats</h1>
        <div className='links'>
          <Link className='link-btn' to='/signUp/'>
            <Button color='primary'>Регистрация</Button>
          </Link>
          <Link className='link-btn' to='/login/'>
            <Button color='primary'>Войти</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Home;
