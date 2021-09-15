import React from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import Routes from './Routes/Routes';
import { store } from './store';
// import FormMess from './components/Form/FormMess.jsx'
// import SideBar from './components/SideBar/SideBar';
// import {ListGroup} from 'reactstrap';
// import Message from './components/Messages/Message';
// import useId from "react-id-generator";

const App = () => {
  return (
    <Provider store={store}>
      <Routes></Routes>
    </Provider>
  );
};

export default App;
