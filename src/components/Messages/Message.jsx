import React, {useEffect} from 'react';
import {ListGroupItem} from 'reactstrap';

function Message({messages, chatId}) {
  useEffect(() => {
    console.log('test', messages);
  }, [messages]);
  if (messages.length) {
    const list = messages.map((item, id) => {
      return (
        <ListGroupItem className='listItem' key={id}>
          <span className='author'>{item.author} :</span>
          <p className='text'>{item.text}</p>
        </ListGroupItem>
      );
    });
    return list;
  } else return <div>Список сообщений пуст</div>;
}
export default Message;
