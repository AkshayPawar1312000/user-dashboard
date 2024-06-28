// Creates a Redux store with middleware (thunk) applied, using combined reducers from the specified index file.
import { applyMiddleware,legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import reducers from "../Reducers/index";

export const store = createStore(reducers, {}, applyMiddleware(thunk))