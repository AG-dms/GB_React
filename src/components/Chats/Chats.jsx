import React, {useCallback, useMemo, useState, useEffect, useRef} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {ListGroup} from 'reactstrap';
import {useSelector, useDispatch} from 'react-redux';
import './Chats.scss';
import FormMess from '../Form/FormMess.jsx';
import SideBar from '../SideBar/SideBar';
import Message from '../Messages/Message';
// import {addChat, deleteChatItem} from '../../store/chats/actions';
// import {addMessageWithReply} from '../../store/messages/actions';
import {db} from '../../Services/firebase';
import {ref, set, onValue} from 'firebase/database';

const Chats = () => {
  const {chatId} = useParams();
  const history = useHistory();

  //чаты из бд
  const [chats, setChats] = useState([]);
  useEffect(() => {
    //userDbRef получаем базу данных, второй аргумент - раздел бд
    const chatsDbRef = ref(db, 'chats');
    // получаем снимок бд и приобразуем в объект методом val()
    onValue(chatsDbRef, (snapshot) => {
      const data = snapshot.val();
      console.log('--------', data);
      setChats(Object.values(data || {}));
    });
  }, []);

  const handleAddChat = (name) => {
    const newId = `chat-${Date.now()}`;
    const chatsDbRef = ref(db, `chats/${newId}`);
    set(chatsDbRef, {id: newId, name: name});
  };

  // добавление сообщений через БД
  const unsubscribeMessages = useRef(null);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (unsubscribeMessages.current) {
      unsubscribeMessages.current();
    }
    const messagesDbRef = ref(db, `messages/${chatId}`);
    const unsubscribe = onValue(messagesDbRef, (snapshot) => {
      const data = snapshot.val();
      console.log('--------', data);
      setMessages(Object.values(data || {}));
    });
    unsubscribeMessages.current = unsubscribe;
    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = useCallback(
    ({text, author}) => {
      const newId = `message-${Date.now()}`;
      const messagesDbRef = ref(db, `messages/${chatId}/${newId}`);
      set(messagesDbRef, {
        author,
        text,
        id: newId,
      });
    },
    [chatId],
  );

  const subForm = useCallback(
    (message) => {
      sendMessage(message);
    },
    [sendMessage],
  );

  // const messageList = useSelector((state) => state.messages.messages);
  // const dispatch = useDispatch();
  // чаты и сообщения из редакса

  // const chats = useSelector((state) => state.chats.chats);
  // const sendMessage = useCallback(
  //   ({text, author}) => {
  //     dispatch(addMessageWithReply(chatId, text, author));
  //   },
  //   [chatId, dispatch],
  // );

  // const AddChat = useCallback(
  //   (name) => {
  //     dispatch(addChat(name));
  //   },
  //   [dispatch],
  // );

  // const deleteChat = useCallback(
  //   (id) => {
  //     dispatch(deleteChatItem(id));
  //     if (chatId === id) {
  //       history.push('/chats');
  //     }
  //   },
  //   [chatId, history, dispatch],
  // );

  // const subForm = useCallback(
  //   (message) => {
  //     sendMessage(message);
  //   },
  //   [sendMessage],
  // );

  const chatExist = useMemo(() => !!chats.find(({id}) => id === chatId), [chatId, chats]);

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
