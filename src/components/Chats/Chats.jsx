import React, { useEffect, useCallback, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import { ListGroup } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import './Chats.scss';
import FormMess from '../Form/FormMess.jsx';
import SideBar from '../SideBar/SideBar';
import Message from '../Messages/Message';
import { addChat, deleteChatItem } from '../../store/chats/actions';
import { addMessage, deleteMessage } from '../../store/messages/actions';


// Не понял куда и как засунуть deleteMessages
// Получается что при удалении чата сообщения остается в стейте
// Но подход с урока наверное не подоедёт к моему варианту приложения

const Chats = () => {
  const { chatId } = useParams();
  const history = useHistory()
  const dispatch = useDispatch();

// VSC ругается что Свойство "chats" не существует в типе "DefaultRootState" и messages соответственно
// Но без них не работает
  const chats = useSelector((state)=> state.chats.chats)
  const messageList = useSelector((state => state.messages.messages))
   
  const sendMessage = useCallback(({text, author})=>{
    dispatch(addMessage(chatId, text, author))
  }, [chatId, dispatch])

  // Добавление нового чата (Вызывается из компонента SideBar)
  const AddChat = useCallback((name) => {
    dispatch(addChat(name))
    },
    [dispatch]
  )

   //Удаление чата
   const deleteChat = useCallback((id) => {
    dispatch(deleteChatItem(id))
     if(chatId === id){
       history.push('/chats')
     }
     },[chatId, history, dispatch])


  // Обработка формы
  const subForm = useCallback((message) => {
    sendMessage(message)
    },[sendMessage]
  )

  useEffect(() => {
    let timeout;
    const curMess = messageList[chatId];
    // Проверка чтобы не было ошибки
    if(chatId && curMess){
      if (messageList[chatId].length && curMess?.[curMess.length -1 ]?.author !== 'Robot') { 
        timeout = setTimeout(() => {
          sendMessage({
            author: 'Robot',
            text: 'Привет',
          })
        }, 1500);
      }
    }
    return () => clearTimeout(timeout);
  }, [messageList, chatId, sendMessage]);


  const chatExist = useMemo(()=> !!chats.find(({id}) => id === chatId), [chatId, chats])

  //Разметка
  return (
    <div className="App">
      <Link to="/"> 
        <Button className='back-btn' color="secondary">На главную</Button>{' '}
      </Link>
      <div className="main-display">
        <SideBar chats={chats} 
        addChat={AddChat}
        deleteChat={deleteChat}
        />
          <div>
            {chatId && chatExist ?
            <>
              <FormMess subForm={subForm}/>
              <ListGroup className="list">
                <Message messageList={messageList} chatId={chatId}>
              </Message>
              </ListGroup>
            </>
            : chats.length === 0 ? <div className="no-chats">
                Список чатов пуст, пожалуйста создайте новый </div> :
                <div className="no-chats">Выберите чат </div>
            }
          </div>
      </div>
    </div>
  );
};

export default Chats;
