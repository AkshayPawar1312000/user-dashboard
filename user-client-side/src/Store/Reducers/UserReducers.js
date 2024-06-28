import {
  ADD_USER_DATA,
  USER_LOGIN,
  LOADER,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
  ALL_USERS,
  DELETE_USER,
  EDIT_USER_INFO
} from "../Constatnt";

// The userReducer file manages state changes related to user actions, including posting user data, user sign-in,
// and fetching all user result data through Redux actions.

const user = (
  state = {
    userData: null,
    loader: false,
    errorMessage: false,
    successMessage: false,
    allUsers: null,
    deleteUser: null,
    editUser:null,
  },
  action
) => {
  switch (action.type) {
    case ADD_USER_DATA:
      return { ...state, userData: action.payload };
    case ALL_USERS:
      return { ...state, allUsers: action.payload.users };
    case USER_LOGIN:
      return { ...state, userData: action.payload };
    case LOADER:
      return { ...state, loader: action.payload };
    case SUCCESS_MESSAGE:
      return { ...state, successMessage: action.payload };
    case ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    case DELETE_USER:
      return { ...state, deleteUser: action.payload };
      case EDIT_USER_INFO:
        return { ...state, editUser: action.payload };
    default:
      return state;
  }
};

export default user;
