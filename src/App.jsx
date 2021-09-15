import React from 'react';
import './App.scss';
import { resetId } from 'react-id-generator';

import Routes from './components/Routes/Routes';
// import FormMess from './components/Form/FormMess.jsx'
// import SideBar from './components/SideBar/SideBar';
// import {ListGroup} from 'reactstrap';
// import Message from './components/Messages/Message';
// import useId from "react-id-generator";

const App = () => {
  resetId();
  return <Routes></Routes>;
};

export default App;
