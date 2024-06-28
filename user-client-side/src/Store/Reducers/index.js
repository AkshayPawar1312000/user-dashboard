import { combineReducers } from "redux";
import user from "./UserReducers";

// Combines multiple Redux reducers into a single root reducer for managing application state.
export default combineReducers({
    user
  });