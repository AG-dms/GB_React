import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PublicRoute = ({authed, ...props}) =>
  !authed ? <Route {...props} /> : <Redirect to='/profile' />;
export default PublicRoute;
