/** @format */

import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../components/Home.jsx';
import Chats from '../components/Chats/Chats';
import Profile from '../components/profile/Profile.jsx';
import News from '../components/News/News.jsx';
import Login from '../components/login/Login.jsx';
import SignUp from '../components/SignUp/SignUp.jsx';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute.jsx';
import PublicRoute from '../components/PublicRoute/PublicRoute.jsx';
import {login, signUp, signOut, auth} from '../Services/firebase';
import {onAuthStateChanged} from 'firebase/auth';

function Routes() {
  const [authed,
    setAuthed] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = async(email, pass) => {
    try {
      await login(email, pass);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSignUp = async(email, pass) => {
    try {
      await signUp(email, pass);
      // setAuthed(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = async() => {
    try {
      await signOut();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path='/' exact authed={authed}>
          <Home onLogin={handleLogin}/>
        </PublicRoute>
        <PublicRoute path='/login' exact authed={authed}>
          <Login onLogin={handleLogin}/>
        </PublicRoute>
        <PublicRoute path='/signUp' exact authed={authed}>
          <SignUp onSignUp={handleSignUp}/>
        </PublicRoute>
        <PrivateRoute path='/chats/:chatId?' authed={authed}>
          <Chats/>
        </PrivateRoute>
        <PrivateRoute path='/profile' authed={authed}>
          <Profile onLogout={handleLogout}/>
        </PrivateRoute>
        <Route path='/news'>
          <News/>
        </Route>
        <Route>
          <h3>404 not found</h3>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
