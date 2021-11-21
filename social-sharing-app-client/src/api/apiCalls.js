import axios from "axios";

export const signUp = (user) => {
  return axios.post("/api/users", user);
}

export const login = (user) => {
  return axios.post("/api/login", {}, {auth: user});
}