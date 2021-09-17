import { ADD_MESSAGE, DELETE_MESSAGE } from "./actions"
import { DELETE_CHAT } from "../chats/actions";

const initialState = {
  messages: {}
}

export const messagesReducer = (state = initialState, {type, payload}) => {
  switch(type){
    case ADD_MESSAGE: {
      return{
        ...state,
        messages: {
          ...state.messages,
          [payload.chatId]: [...(state.messages[payload.chatId] || []), {id: `mess-${Date.now()}`,  author: payload.author, text: payload.text,}]
        }
      }
    }
    case DELETE_MESSAGE: {
      const newChatMessages = state.messages[payload.chatId].filter(({id}) => id !== payload.id)
      return{
        ...state,
        messages: {
          ...state.messages,
          [payload.chatId]: newChatMessages
        }
      }
    }
    case DELETE_CHAT: {
      const newMessages = {...state.messages}
      delete state.messages[payload]
      return{
        ...state,
        messages: newMessages
      }
    }
  default: 
    return state
  }
}