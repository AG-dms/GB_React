import React, {useState, useRef, useEffect} from 'react';
import './SideBar.scss';
import {List, ListItem, ListItemAvatar, Avatar, Input} from '@material-ui/core';
import {Link} from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

function SideBar({chats, addChat, deleteChat}) {
  // Обработчик удаления чата
  
  const [nameChat,
    setNameChat] = useState('');
    
    const [hide,
      setHide] = useState(false);
      const inputRef = useRef('');
      
      const showInput = () => {
        setHide(!hide)
      }
      
      const removeChat = (id)=>{
        deleteChat(id)
      }

  const chatBar = chats.map((item) => {
    return (
      <ListItem className="list-item" key={item.id}>
        <Link className="link-chat" to={`/chats/${item.id}`}>
          <ListItemAvatar>
            <Avatar alt={item.name} src="/static/images/avatar/1.jpg"/>
          </ListItemAvatar>
          {item.name}
        </Link>
        <DeleteIcon fontSize='small' className="basket" onClick={()=>{removeChat(item.id)}}/>
        
      </ListItem>
    );
  });




  useEffect(() => {
    if (hide) {
      inputRef.current.focus();
    }
  }, [hide])

  // Записываем имя нового чата
  const callNewChat = (e) => {
    setNameChat(e.target.value)
  }

  // Передаем имя нового чата и создаем его в Chats
  const makeNewChat = () => {
    addChat(nameChat)
    setNameChat('')
    setHide(!hide)
  }

  // Разметка компонента
  return (
    <div className="chat-bar">
      {hide && <div className="hide-chat">
        <Input
          type="text"
          inputRef={inputRef}
          onChange={callNewChat}
          value={nameChat}
          placeholder="Имя нового чата"/>
        <button className="btn-dd" onClick={makeNewChat}>
          <AddIcon className="fa fa-plus-circle pluse"/>
        </button>
      </div>}
      <button className="add-btn" onClick={showInput}>
        <AddCircleIcon/>
        Добавить чат
      </button>
      <List>{chatBar}</List>
    </div>
  );
}

export default SideBar;
