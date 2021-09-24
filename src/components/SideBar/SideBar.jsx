import React, { useState, useRef, useEffect } from "react";
import "./SideBar.scss";
import { List, ListItem, ListItemAvatar, Avatar, Input } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AddCircle, Cancel, Add } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";

function SideBar({ chats, addChat, deleteChat }) {
  // Обработчик удаления чата

  const [nameChat, setNameChat] = useState("");

  const [hide, setHide] = useState(false);
  const inputRef = useRef("");

  const showInput = () => {
    setHide(!hide);
  };

  const removeChat = (id) => {
    deleteChat(id);
  };

  const chatBar = chats.map((item) => {
    return (
      <ListItem className="list-item" key={item.id}>
        <Link className="link-chat" to={`/chats/${item.id}`}>
          <ListItemAvatar>
            <Avatar alt={item.name} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          {item.name}
        </Link>
        <DeleteIcon
          fontSize="small"
          className="basket"
          onClick={() => {
            removeChat(item.id);
          }}
        />
      </ListItem>
    );
  });

  useEffect(() => {
    if (hide) {
      inputRef.current.focus();
    }
  }, [hide]);

  // Записываем имя нового чата
  const callNewChat = (e) => {
    setNameChat(e.target.value);
  };

  // Передаем имя нового чата и создаем его в Chats
  const makeNewChat = () => {
    addChat(nameChat);
    setNameChat("");
    setHide(!hide);
  };

  // Разметка компонента
  return (
    <div className="chat-bar">
      {hide && (
        <div className="hide-chat">
          <Input
            type="text"
            inputRef={inputRef}
            onChange={callNewChat}
            value={nameChat}
            placeholder="Имя нового чата"
          />
          <button className="addChat " onClick={makeNewChat}>
            <Add fontSize="large" />
          </button>
        </div>
      )}
      <button className="add-btn" onClick={showInput}>
        {!hide ? (
          <>
            <AddCircle fontSize="large" color="primary" className="pluse" />
            <span>Добавить чат</span>
          </>
        ) : (
          <>
            <Cancel fontSize="large" color="primary" /> <span>Закрыть</span>
          </>
        )}
      </button>
      <List>{chatBar}</List>
    </div>
  );
}

export default SideBar;
