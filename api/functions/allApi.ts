import axios from "axios";
import { endpoints } from "../endpoints";
import { axiosInstance } from "../axiosinstance";


export interface IweatherPayload{
  lat:number
  lon:number
  

}

export const fetchWeatherDetails = async (obj:IweatherPayload) => {
    const res = await axiosInstance.get<any>(endpoints.auth.weather(obj));
    return res;
  };
  

  // export const fetchConferenceDetails = async () => {
  //   const res = await axiosInstance.get(endpoints.auth.conference);
  //   return res;
  // };

  
  