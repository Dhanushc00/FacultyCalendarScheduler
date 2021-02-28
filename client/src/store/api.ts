import axios from "axios";
import React from 'react';
import Cookies from 'js-cookie'
export const api = axios.create({
  baseURL: "http://localhost:3012/api",
});
api.interceptors.request.use(async(req)=>{
      let jwt=Cookies.get("token")
      req.headers.common["Authorization"] = `Token ${jwt}`;
      return req
})
export const setToken = (jwt: string) => {
  console.log("Inside api")
  api.defaults.headers.common["Authorization"] = `Token ${jwt}`;
};

export const clearToken = () => {
  delete api.defaults.headers.common["Authorization"];
};
