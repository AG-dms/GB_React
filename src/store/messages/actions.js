export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE';
export const DELETE_MESSAGE = 'MESSAGES::DELETE_MESSAGE';

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


let timeout;
// Я правильно понял, что мы тут используем thunk?
// Честно говоря не понял как редакс понимает что код ниже это мидлвар ведь конкретно в этом файле мы не ипортируем thunk и не используем каких то методов типо thunk()
// Мы импортировали thunk в index.js стора, экспортировали оттуда стор с applyMiddleware(thunk) 
// Но как тут код понимает?
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