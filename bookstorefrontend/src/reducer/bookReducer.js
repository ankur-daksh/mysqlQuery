
import {
    BOOK_REQUEST,
    BOOK_SUCCESS,
    BOOK_FAIL,
} from "../constant/bookConstant.js";



 export const bookListReducer = (state = {}, action) => {
    switch (action.type) {
      case BOOK_REQUEST:
        return { loading: true };
      case BOOK_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case BOOK_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  