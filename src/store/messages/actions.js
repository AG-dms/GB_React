import {
  onValue,
  ref,
  set
} from "@firebase/database";
import {
  db
} from "../../Services/firebase";

export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE';
export const DELETE_MESSAGE = 'MESSAGES::DELETE_MESSAGE';
export const SET_MESSAGES = 'MESSAGES::SET_MESSAGES';

export const addMessage = (chatId, text, author) => {
  return ({
    type: ADD_MESSAGE,
    payload: {
      chatId,
      text,
      author
    }
  })
};

export const deleteMessage = (chatId, id) => ({
  type: DELETE_MESSAGE,
  chatId,
  id
});

const setMessages = (messages) => ({

  type: SET_MESSAGES,
  payload: messages

})


let timeout;
export const addMessageWithReply = (chatId, text, author) => (dispatch) => {
  // Проверка чтобы не было ошибки
  dispatch(addMessage(chatId, text, author));
  if (author !== "Robot") {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch(addMessage(
        chatId,
        author = "Robot",
        text = "Привет",
      ));
    }, 1500);
  }
}

export const initMessages = () => (dispatch) => {
  const messagesDbRef = ref(db, 'messages');
  onValue(messagesDbRef, (snapshot) => {
    const data = snapshot.val();
    dispatch(setMessages(data || {}));
  });
}

export const addMessageFb = (text, author, chatId) => (dispatch) => {
  const newId = `message-${Date.now()}`;
  const messagesDbRef = ref(db, `messages/${chatId}/${newId}`);
  set(messagesDbRef, {
    author,
    text,
    id: newId,
  });
  console.log(messagesDbRef)
}