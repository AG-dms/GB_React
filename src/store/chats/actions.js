import {
  onValue,
  ref,
  set
} from "@firebase/database";
import {
  db
} from "../../Services/firebase";

export const ADD_CHAT = 'CHATS::ADD_CHAT';
export const DELETE_CHAT = 'CHATS::DELETE_CHAT';
export const SET_CHATS = 'CHATS::SET_CHATS';

export const addChat = (name) => {
  return ({
    type: ADD_CHAT,
    payload: name
  })
}

export const deleteChatItem = (id) => {
  return ({
    type: DELETE_CHAT,
    payload: id
  })
}
export const setChats = (chats) => {
  return ({
    type: SET_CHATS,
    payload: chats
  })
}

export const initChats = () => (dispatch) => {
  //chatsDbRef получаем базу данных, второй аргумент - раздел бд
  const chatsDbRef = ref(db, 'chats');
  // получаем снимок бд и приобразуем в объект методом val()
  onValue(chatsDbRef, (snapshot) => {
    const data = snapshot.val();
    dispatch(setChats(Object.values(data || {})))
  });
}
export const addChatsFb = (name) => (dispath) => {
  const newId = `chat-${Date.now()}`;
  const chatsDbRef = ref(db, `chats/${newId}`);
  set(chatsDbRef, {
    id: newId,
    name: name
  });
}