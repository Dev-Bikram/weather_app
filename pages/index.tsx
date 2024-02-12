import { axiosInstance } from '@/api/axiosinstance';
import {fetchWeatherDetails } from '@/api/functions/allApi';
import Wrapper from '@/layout/Wrapper'
import { CssBaseline, FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';





dayjs.extend(utc);
dayjs.extend(timezone);

type IweatherPayload  = {
  lat: number
  lon: number
}



const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const Index = () => {
  const [place, setPlace] = useState<IweatherPayload | null>(null)
  // const [search, setSearch] = useState<boolean>(false);
  const [theme, setTheme] = useState(darkTheme);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IweatherPayload>()

  

  const { data: weather, isLoading } = useQuery({
    queryKey: ['weather', place],
    queryFn: () => !!place ? fetchWeatherDetails(place) : fetchWeatherDetails({
      lat: 0,
      lon: 0
    }),
    enabled: !!place 
  });
const onSubmit: SubmitHandler<IweatherPayload> = (data) => {
    setPlace(data);
    }
    console.log(weather)

    

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    
    )
  }

  const toggleTheme = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  };

 

  return (
    <>
    
    <ThemeProvider theme={theme}>
      <Wrapper>
        <div>
          <h1 style={{ textAlign: "center" }}>Weather Info</h1>
          <br/>
          <h3 style={{ textAlign: "center" }}>Please Enter Your City Longitude & Latitude Here</h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <CssBaseline/>
          <Button onClick={toggleTheme} variant="contained" color="primary">
            Light Mood/Dark Mood
          </Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '56vh' }}>
          <FormControl onSubmit={handleSubmit(onSubmit)}>
            <Stack
              component="form"
              sx={{
                width: '25ch',
                margin: 'auto'
              }}
              spacing={2}
              noValidate
              autoComplete="off"
            >
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                variant="filled"
                size="small"
                placeholder='Latitude'
                {...register("lat", { required: true })}
              />
              <TextField
                hiddenLabel
                id="filled-hidden-label-normal"
                variant="filled"
                placeholder='Longitude'
                {...register("lon", { required: true })}
              />
              <Button variant="contained" type='submit' disableElevation>
                Search
              </Button>
            </Stack>
          </FormControl>
        </div>


        <div>

        <TableContainer component={Paper}>
      <Table>
       <TableBody>
         
       <TableRow>
           <TableCell>City Name</TableCell>
           <TableCell>City Code</TableCell>
           <TableCell>Country</TableCell>
           <TableCell>Humidity</TableCell>
           <TableCell>Sunrise</TableCell>
           <TableCell>Sunset</TableCell>
           <TableCell>Temperature</TableCell>
           <TableCell>Wind-Speed</TableCell>
           
       </TableRow>
       
       <TableRow>
                <TableCell>{weather?.data.name}</TableCell>
                <TableCell>{weather?.data.cod}</TableCell>
                <TableCell>{weather?.data.sys.country}</TableCell>
                <TableCell>{weather?.data.main.humidity}%</TableCell>
                <TableCell>{dayjs.unix(weather?.data.sys.sunrise).utc().format('ddd MMM D YYYY HH:mm:ss ')}</TableCell>
                <TableCell>{dayjs.unix(weather?.data.sys.sunset).utc().format('ddd MMM D YYYY HH:mm:ss ')}</TableCell>
                <TableCell>{weather?.data.main.temp} K</TableCell>
                <TableCell>{weather?.data.wind.speed} mt/sec</TableCell>
              </TableRow>
        



       </TableBody>
       </Table>
       </TableContainer>

        </div>
           
        

        <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        
        <iframe src="https://www.google.com/maps/d/embed?mid=1VFzjeArnHwIghbeiCRbBMQTOquk&hl=en&ehbc=2E312F" width="1500" height="480"></iframe>

        </div>
      </Wrapper>
      </ThemeProvider>
      

     
    </>
  )
}

export default Index

