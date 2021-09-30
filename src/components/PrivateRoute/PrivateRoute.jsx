/** @format */

import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({authed, ...props}) => (authed ? <Route {...props} /> : <Redirect to='/' />);
export default PrivateRoute;
