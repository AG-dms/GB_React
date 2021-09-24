import React, { useCallback, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ListGroup } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import './Chats.scss';
import FormMess from '../Form/FormMess.jsx';
import SideBar from '../SideBar/SideBar';
import Message from '../Messages/Message';
import { addChat, deleteChatItem } from '../../store/chats/actions';
import { addMessageWithReply } from '../../store/messages/actions';

const Chats = () => {
  const { chatId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const chats = useSelector((state) => state.chats.chats);
  const messageList = useSelector((state) => state.messages.messages);

  const sendMessage = useCallback(
    ({ text, author }) => {
      dispatch(addMessageWithReply(chatId, text, author));
    },
    [chatId, dispatch],
  );

  const AddChat = useCallback(
    (name) => {
      dispatch(addChat(name));
    },
    [dispatch],
  );

  const deleteChat = useCallback(
    (id) => {
      dispatch(deleteChatItem(id));
      if (chatId === id) {
        history.push('/chats');
      }
    },
    [chatId, history, dispatch],
  );

  const subForm = useCallback(
    (message) => {
      sendMessage(message);
    },
    [sendMessage],
  );

  const chatExist = useMemo(() => !!chats.find(({ id }) => id === chatId), [chatId, chats]);

  //Разметка
  return (
    <div className='App'>
      <Link to='/'>
        <Button className='back-btn' color='secondary'>
          На главную
        </Button>{' '}
      </Link>
      <div className='main-display'>
        <SideBar chats={chats} addChat={AddChat} deleteChat={deleteChat} />
        <div>
          {chatId && chatExist ? (
            <>
              <FormMess subForm={subForm} />
              <ListGroup className='list'>
                <Message messageList={messageList} chatId={chatId}></Message>
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
