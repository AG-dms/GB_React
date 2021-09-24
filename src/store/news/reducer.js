import {
  REQUEST_STATUS
} from "../../constants";
import {
  GET_ARTICLES_FAILURE,
  GET_ARTICLES_PENDING,
  GET_ARTICLES_SUCSESS
} from "./actions";


const initialState = {
  list: [],
  request: {
    error: null,
    status: REQUEST_STATUS.IDLE
  }
}

export const newsReducer = (state = initialState, {
  type,
  payload
}) => {
  switch (type) {
    case GET_ARTICLES_PENDING: {
      return {
        ...state,
        request: {
          error: null,
          status: REQUEST_STATUS.PENDING
        }

      }
    }
    case GET_ARTICLES_SUCSESS: {
      return {
        ...state,
        list: payload,
        request: {
          ...state.request,
          status: REQUEST_STATUS.SUCSESS,

        }
      }
    }
    case GET_ARTICLES_FAILURE: {
      return {
        ...state,
        request: {
          error: payload,
          status: REQUEST_STATUS.FAILURE,
        }
      }
    }
    default:
      return state;
  }
}