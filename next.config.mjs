/** @type {import('next').NextConfig} */
const nextConfig = {

    env: {
        NEXT_APP_BASE_URL_WEATHER:process.env.NEXT_APP_BASE_URL_WEATHER,
        NEXT_APP_API_KEY: process.env.NEXT_APP_API_KEY,
        NEXT_APP_BASE_URL_WEATHER_HISTORY:process.env.NEXT_APP_BASE_URL_WEATHER_HISTORY
    }
};

export default nextConfig;
