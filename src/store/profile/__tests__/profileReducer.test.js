import {
  profileReducer,
  initialState
} from '../reducer';
import {
  changeName,
  CHANGE_NAME
} from '../actions.js';

describe('profile reducer', () => {
  it('shood return initial state', () => {
    const expect = {
      type: CHANGE_NAME,
    }
    const recived = changeName();

    expect()

  })
})