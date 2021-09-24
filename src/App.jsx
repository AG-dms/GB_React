import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.scss";
import Routes from "./Routes/Routes";
import { store, persistor } from "./store";
// import FormMess from './components/Form/FormMess.jsx'
// import SideBar from './components/SideBar/SideBar';
// import {ListGroup} from 'reactstrap';
// import Message from './components/Messages/Message';
// import useId from "react-id-generator";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes></Routes>
      </PersistGate>
    </Provider>
  );
};

export default App;
