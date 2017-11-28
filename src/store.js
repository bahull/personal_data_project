import { createStore, applyMiddleware } from "redux";

import promiseMiddleware from "redux-promise-middleware";
import reducer from "./ducks/reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware()))
);

export default store;
