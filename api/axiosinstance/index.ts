import axios from "axios";
import { baseUrl_Weather } from "../endpoints";






export const axiosInstance = axios.create({
    baseURL: baseUrl_Weather,
    
  });

  // const config = {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  //   }
  // };

  // axiosInstance.interceptors.request.use((config) => {
  
    
  
  //   const token = process.env.NEXT_APP_API_KEY;
  //   if (token && !!config.headers) {
  //     config.headers["BearerToken"] = `${token}`;
  //     // config.headers["Authorization"] = `Bearer ${token}`;
     
  //   }
  
  //   return config;
  // });
  

