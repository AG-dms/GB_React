import React from 'react';
import { ListGroupItem } from 'reactstrap';

function Message({ messageList, chatId }) {
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
    <div>Такого чата не существует
  
    </div>
  )
  }

export default Message;
