import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import { ListGroup } from 'reactstrap';
import useId from 'react-id-generator';
import './Chats.scss';
import FormMess from '../Form/FormMess.jsx';
import SideBar from '../SideBar/SideBar';
import Message from '../Messages/Message';

const Chats = () => {
  const { chatId } = useParams();
  console.log(chatId)

  const initialChats = [
    {
      id: useId(),
      name: 'Remy Sharp',
    },
    {
      id: useId(),
      name: 'Travis Howard',
    },
    {
      id: useId(),
      name: 'Cindy Baker',
    },
  ];
  const initialMessages = initialChats.reduce((acc, chat) => {
    acc[chat.id] = [
      {
        author: chat.name,
        text: 'text',
      },
    ];
    return acc;
  }, {});

 

  // Переменная для хранения значений инпутов State списока постов
  const [messageList, setMessageList] = useState(initialMessages);

  const [chats, setChats] = useState(initialChats);

  const sendMessage = useCallback((message)=>{
    setMessageList((prevMessage)=>({
      ...prevMessage,
      [chatId]:[
        ...prevMessage[chatId], message
      ]}))
  }, [chatId])

  // Добавление нового чата (Вызывается из компонента SideBar)
  // Обернуть в useCallback не получается, возникает ошибка вложенных хуков
  const AddChat = (name)=>{
    const newChat = {id: useId(), name: name}
    const newMessages = 
      {
        author: newChat.name,
        text: 'text',
      }
    setChats([...chats, newChat])
    setMessageList((prevMess)=>({
          ...prevMess, [newChat.id]: [newMessages]
        }))
  }

   //Удаление чата
   const deleteChat = (id)=>{
     const newChatsArr = chats.filter((item)=>{
        return item.id !== id
     })

     setChats(newChatsArr)

  }

  // Обновление списка чатов и добавление новому чату сообщений по умолчанию
  useEffect(()=>{
  }, [chats, messageList])

  // Обработка формы
  const subForm = useCallback((message) => {
    sendMessage(message)
    },[sendMessage]
  )

  useEffect(() => {
    let timeout;
    const curMess = messageList[chatId];
    if(chatId && curMess){
      if (messageList[chatId].length && messageList[chatId].length !== 1 && curMess?.[curMess.length -1 ]?.author !== 'Robot') {

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
            {chatId ?
            <>
              <FormMess subForm={subForm}/>
              <ListGroup className="list">
                <Message messageList={messageList} chatId={chatId}>
              </Message>
              </ListGroup>
            </>
            : <div className="no-chats">Выберите чат </div> 
            }
          </div>
      </div>
    </div>
  );
};

export default Chats;
