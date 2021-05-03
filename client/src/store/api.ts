import axios from "axios";
import React from 'react';
import Cookies from 'js-cookie';
const baseURL = process.env.NODE_ENV==="production" ? "api" :"http://localhost:3012/api" ;
export const api = axios.create({
  baseURL,
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
