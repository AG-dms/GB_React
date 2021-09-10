import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from '../Home.jsx';
import Chats from '../Chats/Chats';
import Profile from '../profile/Profile.jsx';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/chats/:chatId?">
          <Chats/>
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
        <Route>
          <h3>404 not found</h3>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
