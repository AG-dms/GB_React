import React, { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ListGroup } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import './Chats.scss';
import FormMess from '../Form/FormMess.jsx';
import SideBar from '../SideBar/SideBar';
import Message from '../Messages/Message';
import { addChat, addChatsFb, deleteChatItem, initChats } from '../../store/chats/actions';
// import {db} from '../../Services/firebase';
// import {ref, set, onValue} from 'firebase/database';
import { addMessageFb, initMessages } from '../../store/messages/actions';

const Chats = () => {
  const { chatId } = useParams();
  const chats = useSelector((state) => state.chats.chats);
  const messages = useSelector((state) => state.messages.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initChats());
    dispatch(initMessages());
  }, []);

  const handleAddChat = (name) => {
    dispatch(addChatsFb(name));
  };

  const chatExist = useMemo(() => !!chats.find(({ id }) => id === chatId), [chatId, chats]);
  const sendMessage = useCallback(
    ({ text, author }) => {
      dispatch(addMessageFb(text, author, chatId));
    },
    [chatId],
  );

  const subForm = useCallback(
    (message) => {
      sendMessage(message);
    },
    [sendMessage],
  );

  //Разметка
  return (
    <div className='App'>
      <Link to='/'>
        <Button className='back-btn' color='secondary'>
          На главную
        </Button>{' '}
      </Link>
      <div className='main-display'>
        <SideBar chats={chats} addChat={handleAddChat} />
        <div>
          {chatId && chatExist ? (
            <>
              <FormMess subForm={subForm} />
              <ListGroup className='list'>
                <Message messages={messages} chatId={chatId}></Message>
              </ListGroup>
            </>
          ) : chats.length === 0 ? (
            <div className='no-chats'>Список чатов пуст, пожалуйста создайте новый </div>
          ) : (
            <div className='no-chats'>Выберите чат </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
