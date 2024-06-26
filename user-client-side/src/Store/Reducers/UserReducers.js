import {
  ADD_USER_DATA,
  USER_LOGIN,
  LOADER,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from "../Constatnt";

// The userReducer file manages state changes related to user actions, including posting user data, user sign-in,
// and fetching all user result data through Redux actions.

const user = (
  state = {
    userData: null,
    loader: false,
    errorMessage: false,
    successMessage: false,
  },
  action
) => {
  switch (action.type) {
    case ADD_USER_DATA:
      return { ...state, userData: action.payload };
    case USER_LOGIN:
      return { ...state, userData: action.payload };
    case LOADER:
      return { ...state, loader: action.payload };
    case SUCCESS_MESSAGE:
      return { ...state, successMessage: action.payload };
    case ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export default user;
