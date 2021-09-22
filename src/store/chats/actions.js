export const ADD_CHAT = 'CHATS::ADD_CHAT';
export const DELETE_CHAT = 'CHATS::DELETE_CHAT'

export const addChat = (name) => {
  return (
    {
      type: ADD_CHAT,
      payload: name
    }
  )
}

export const deleteChatItem = (id) => {
  return ({
    type: DELETE_CHAT,
    payload: id
  })
}