import React from 'react';
import { ListGroupItem } from 'reactstrap';

function Message({messageList}) {

    const list = messageList.map((item, id) => {
        return (
          <ListGroupItem className="listItem" key={id}>
            <span className="author">{item.author} :</span>
            
            <p className="text">{item.text}</p>
          </ListGroupItem>
        )
      })
      return list
}

export default Message
