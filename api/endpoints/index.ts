import { IweatherPayload } from "../functions/allApi";

export const baseUrl_Weather = process.env.NEXT_APP_BASE_URL_WEATHER;
// export const baseUrlApi = `${process.env.NEXT_APP_BASE_URL}/api/`;
// export const baseUrlMedia = process.env.NEXT_APP_BASE_URL;
 const Api_Key = process.env.NEXT_APP_API_KEY;
 




export const endpoints = {
    auth: {
      weather:(obj:IweatherPayload)=> `/data/2.5/weather?lat=${obj.lat}&lon=${obj.lon}&appid=${Api_Key}`,
      teams: "/teams?conference=test",
      coaches:"",
      conference: "/conferences",
     
    },
    
  };
  
  export const sucessNotificationEndPoints = [

    endpoints.auth.weather,
    endpoints.auth.teams,
    endpoints.auth.coaches,
    endpoints.auth.conference,

  ];