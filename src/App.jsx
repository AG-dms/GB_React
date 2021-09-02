import React, {useEffect, useState} from 'react';
import './App.scss';
import { Button } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';


const App = () => {


  // Переменная для хранения значений инпутов
  let singleMessage = {
    text: '',
    author: ''
  }
  // State списока постов
  const [messageList, setMessageList] = useState([]);

  // state input ов
  const [message, setMessage] = useState(singleMessage);

  // Блок кнопки отправки сообщения пока отвечает робот
  const [blockBtn, setBlockBtn] = useState(false)

  // выводим список постов через map
  const list = messageList.map((item, id) => {
    return (
      <ListGroupItem className="listItem" key={id}>
        <span className="author">{item.author} :</span>
        <p className="text">{item.text}</p>
      </ListGroupItem>
    )
  })

  // Отлавливаем события изменения в инпутах
  const changeText = (event) => {
    setMessage({...message, text: event.target.value})
  }

  const changeAuthor = (event) => {
    setMessage({...message, author: event.target.value})
  }


// Обработка формы + очистка инпутов
  const subForm = (e) => {
    e.preventDefault()
    setBlockBtn(true)
    setMessageList([...messageList, message
    ])
    setMessage({author: '', text: ''});
  }

  useEffect(()=>{
    if(messageList.length){
      if(messageList[messageList.length-1].author !== 'Robot'){
        const robotAnswer = {
          author: 'Robot',
          text: 'Привет'
        }
        setTimeout(()=>{
          setMessageList([...messageList, robotAnswer]);
          setBlockBtn(false)
        },1500)
      }
    }
    },[messageList])


  //Разметка
  return (
    <div className="App">
      <form className="form" onSubmit={subForm}>
        <div className=" form__div">
        <input
          className="form__form-input"
          type="text"
          value={message.author}
          onChange={changeAuthor}
          placeholder="Как вас зовут?"/>
        <input
          className="form__form-input"
          type="text"
          value={message.text}
          onChange={changeText}
          placeholder="Текст сообщения"/>
        <Button disabled={blockBtn} className="button" color="primary">Отправить</Button>
        </div>
      </form>
      <ListGroup className="list">
        {list}
      </ListGroup>
    </div>
  );
}

export default App;
