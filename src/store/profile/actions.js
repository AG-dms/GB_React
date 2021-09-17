export const TOGGLE_SHOW_NAME = 'PROFILE::TOGGLE_SHOW_NAME';
export const CHANGE_NAME = 'PROFILE::CHANGE_NAME';

export const toggleShowName = {
  type: TOGGLE_SHOW_NAME
}

export const changeName = (name) => {
  return (
    {
      type: CHANGE_NAME,
      payload: name
    }
  )
}