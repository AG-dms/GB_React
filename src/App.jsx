import React, {useEffect, useState, useRef} from 'react';
import './App.scss';
import SideBar from './SideBar';
import { Button, ListGroup } from 'reactstrap';
import { Input} from '@material-ui/core';
import Message from './Message';

const singleMessage = {
  text: '',
  author: '',
  date: ''
}

const App = () => {


  // Переменная для хранения значений инпутов

  // State списока постов
  const [messageList, setMessageList] = useState([]);

  // state input ов
  const [message, setMessage] = useState(singleMessage);

  // Блок кнопки отправки сообщения пока отвечает робот
  const [blockBtn, setBlockBtn] = useState(false)

  const inputRef = useRef(null);


  // Отлавливаем события изменения в инпутах
  const changeText = (event) => {
    setMessage({...message, text: event.target.value})
  }

  const changeAuthor = (event) => {
    setMessage({...message, author: event.target.value, date: new Date()})
  }


// Обработка формы + очистка инпутов
  const subForm = (e) => {
    e.preventDefault()
    setBlockBtn(true)
    setMessageList([...messageList, message
    ])
    setMessage({author: '', text: ''});
    inputRef.current.focus();
  }

  useEffect(()=>{
    inputRef.current.focus()
    if(messageList.length){
      inputRef.current.focus();
      if(messageList[messageList.length -1].author !== 'Robot'){
        const robotAnswer = {
          author: 'Robot',
          text: 'Привет'
        }
        setTimeout(()=>{
          setMessageList([...messageList, robotAnswer]);
          setBlockBtn(false)
        },1500)
      }
      inputRef.current.focus();
    }
    },[messageList])


  //Разметка
  return (
    <div className="App">
      <SideBar/>
      <div>
      <form className="form" onSubmit={subForm}>
        <div className=" form__div">
        <Input
          className="form__form-input"
          type="text"
          label="label"
          value={message.author}
          inputRef={inputRef}
          onChange={changeAuthor}
          placeholder="Как вас зовут?"/>
        <Input
          className="form__form-input"
          type="text"
          value={message.text}
          onChange={changeText}
          placeholder="Введите текст"/>
        <Button disabled={blockBtn} className="button" color="primary">Отправить</Button>
        </div>
      </form>
      <ListGroup className="list">
        <Message
        messageList={messageList}
        ></Message>
      </ListGroup>
      </div>
    </div>
  );
}

export default App;
