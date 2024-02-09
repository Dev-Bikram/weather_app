import { IweatherPayload , IweatherHistoryPayload} from "../functions/allApi";

export const baseUrl_Weather = process.env.NEXT_APP_BASE_URL_WEATHER;
export const baseUrl_History = process.env.NEXT_APP_BASE_URL_WEATHER_HISTORY;
const Api_Key = process.env.NEXT_APP_API_KEY;
// export const baseUrlApi = `${process.env.NEXT_APP_BASE_URL}/api/`;
// export const baseUrlMedia = process.env.NEXT_APP_BASE_URL;

 




export const endpoints = {
    weatherReport: {
      weather:(obj:IweatherPayload)=> `/data/2.5/weather?lat=${obj.lat}&lon=${obj.lon}&appid=${Api_Key}`,
      weatherHistory:(obj:IweatherHistoryPayload)=> `/data/2.5/history/city?lat=${obj.lat}&lon=${obj.lon}&type=hour&start=${obj.start}&end=${obj.end}&appid=${Api_Key}`,
      
     
    },
    
  };
  
  export const sucessNotificationEndPoints = [

    endpoints.weatherReport.weather,
    endpoints.weatherReport.weatherHistory,
   
  ];