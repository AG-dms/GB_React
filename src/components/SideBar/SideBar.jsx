import React, {useState} from 'react';
import './SideBar.scss';
import { List, ListItem, ListItemAvatar, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';

function SideBar({ chats, addChat }) {
  const chatBar = chats.map((item) => {
    return (
      <ListItem className="list-item" key={item.id}>
        <Link className="link-chat" to={`/chats/${item.id}`}>
          <ListItemAvatar>
            <Avatar alt={item.name} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          {item.name}
        </Link>
      </ListItem>
    );
  });
  const [nameChat, setNameChat] = useState('')

  // Записываем имя нового чата
  const callNewChat = (e)=>{
    setNameChat(e.target.value)
  }

  // Передаем имя нового чата и создаем его в Chats
  const makeNewChat = ()=>{
    addChat(nameChat)
  }
  return (
    <div className="chat-bar">
      <input type="text" 
      onChange={callNewChat}/>
      <button className="add-btn"
      onClick={makeNewChat}
      >
        <AddCircleIcon/>
        Добавить чат
      </button>
      <List>{chatBar}</List>
    </div>
  );
}

export default SideBar;
