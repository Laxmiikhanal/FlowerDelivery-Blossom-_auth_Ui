// import axios from 'axios';
// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL 
// || 'http://localhost:5050';
//  const axiosInstance = axios.create(
// {
//    baseURL: BASE_URL,
//    headers: {
//      'Content-Type': 'application/json',
//    },
//  });
//     export default axiosInstance;
import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // must be http://localhost:5050
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axios;