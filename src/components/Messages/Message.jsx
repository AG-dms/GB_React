import React from 'react';
import { ListGroupItem } from 'reactstrap';

function Message({ messageList, chatId }) {
  
  //Проверка на существование такого объекта по ссылке
  // Все таки не придумал как правильно отображать - в случае когда просто нет сообщений и когда  ..// несуществующий чат
   if(messageList){
    if(messageList[chatId]){
      const list = messageList[chatId].map((item, id) => {
        return (
          <ListGroupItem className="listItem" key={id}>
            <span className="author">{item.author} :</span>
    
            <p className="text">{item.text}</p>
          </ListGroupItem>
        );
      });
      return list;   
  } else return (
    <div>Список сообщений пуст</div>
  )
  } else return (
    <div>Такого чата не существует</div>
  )
  }
export default Message;
