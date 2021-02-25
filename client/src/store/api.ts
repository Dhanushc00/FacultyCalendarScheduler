import axios from "axios";
import React from 'react';
export const api = axios.create({
  baseURL: "http://localhost:3012/api",
});

export const setToken = (jwt: string) => {
  api.defaults.headers.common["Authorization"] = `Token ${jwt}`;
};

export const clearToken = () => {
  delete api.defaults.headers.common["Authorization"];
};
