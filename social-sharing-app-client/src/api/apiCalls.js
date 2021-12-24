import axios from "axios";

export const signUp = (user) => {
  return axios.post("/api/users", user);
}

export const listUsers = (param = {page: 0, size: 3}) => {
  const path = `/api/users?page=${param.page || 0}&size=${param.size || 3}`;
  return axios.get(path);
}

export const getUser = (username) => {
  const path = `/api/users/${username}`;
  return axios.get(path);
}

export const login = (user) => {
  return axios.post("/api/login", {}, {auth: user});
}

export const setAuthHeader = ({username, password, isLoggedIn}) => {
  if (isLoggedIn) {
    axios.defaults.headers.common['Authorization'] = `Basic ${btoa(
        username + ":" + password)}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}