import axios from "axios";
import { endpoints } from "../endpoints";
import { axiosInstance, axiosInstances } from "../axiosinstance";


export interface IweatherPayload{
  lat:number
  lon:number
  

}

export interface IweatherHistoryPayload{
  lat:number
  lon:number
  start: number
  end: number
  

}

export const fetchWeatherDetails = async (obj:IweatherPayload) => {
    const res = await axiosInstance.get<any>(endpoints.weatherReport.weather(obj));
    return res;
  };

  export const fetchWeatherHistoryDetails = async (obj:IweatherHistoryPayload) => {
    const res = await axiosInstances.get<any>(endpoints.weatherReport.weatherHistory(obj));
    return res;
  };
  

  // export const fetchConferenceDetails = async () => {
  //   const res = await axiosInstance.get(endpoints.auth.conference);
  //   return res;
  // };

  
  