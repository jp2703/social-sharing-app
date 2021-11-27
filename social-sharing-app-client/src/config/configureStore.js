import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import authReducer from "../redux/authReducer";
import * as apiCalls from "../api/apiCalls";

const configureStore = (addLogger = true) => {
  let localStorageData = localStorage.getItem("auth");

  let persistedState = {
    id: 0,
    username: '',
    displayName: '',
    image: '',
    password: '',
    isLoggedIn: false
  };
  if (localStorageData) {
    try {
      persistedState = JSON.parse(localStorageData);
      apiCalls.setAuthHeader(persistedState);
    } catch (e) {

    }
  }

  const middleware = addLogger
      ? applyMiddleware(thunk, logger) : applyMiddleware(thunk);
  const store = createStore(authReducer, persistedState, middleware);

  store.subscribe(() => {
    localStorage.setItem("auth", JSON.stringify(store.getState()));
    apiCalls.setAuthHeader(store.getState());
  });

  return store;
}

export default configureStore;