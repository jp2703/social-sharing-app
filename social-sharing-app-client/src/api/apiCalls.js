import axios from "axios";

export const signUp = (user) =>{
  return axios.post("/api/users", user);
}