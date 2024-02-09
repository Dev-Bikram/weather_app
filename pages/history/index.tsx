import { axiosInstance } from '@/api/axiosinstance';
import {fetchWeatherHistoryDetails } from '@/api/functions/allApi';
import Wrapper from '@/layout/Wrapper'
import { FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
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
import BarChart from './chart';



dayjs.extend(utc);
dayjs.extend(timezone);

type IweatherHistoryPayload = {
  lat: number
  lon: number
  start: number
  end: number
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
  const [history, setHistory] = useState<IweatherHistoryPayload | null>(null)
  // const [search, setSearch] = useState<boolean>(false);
  const [theme, setTheme] = useState(darkTheme);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IweatherHistoryPayload>()

  

  const { data: report, isLoading } = useQuery({
    queryKey: ['report', history],
    queryFn: () => !!history ? fetchWeatherHistoryDetails(history) : fetchWeatherHistoryDetails({
      lat: 0,
      lon: 0,
      start: 0,
      end: 0
    }),
    enabled: !!history
  });
const onSubmit: SubmitHandler<IweatherHistoryPayload> = (data) => {
    setHistory(data);
    }
    console.log(report)

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const toggleTheme = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  };

 

  return (
    <>
    <ThemeProvider theme={theme}>
      <Wrapper>
        <div>
          <h1 style={{ textAlign: "center" }}>Weather History Report</h1>
          <br/>
          <h3 style={{ textAlign: "center" }}>Please Enter The Following Details Here</h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Button onClick={toggleTheme} variant="contained" color="primary">
            Light Mood/Dark Mood
          </Button>
        </div>
        <br/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Button  variant="contained" color="primary">
          <Link href="/" >
              Back
          </Link>
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
              <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                variant="filled"
                placeholder='Start-Time'
                {...register("start", { required: true })}
              />
              <TextField
                hiddenLabel
                id="filled-hidden-label-normal"
                variant="filled"
                placeholder='End-Time'
                {...register("end", { required: true })}
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
           
       </TableRow>
       
       <TableRow>
                {/* <TableCell>{weather?.data.name}</TableCell>
                <TableCell>{weather?.data.cod}</TableCell>
                <TableCell>{weather?.data.sys.country}</TableCell>
                <TableCell>{weather?.data.main.humidity}</TableCell>
                <TableCell>{dayjs.unix(weather?.data.sys.sunrise).utc().format('ddd MMM D YYYY HH:mm:ss [GMT]ZZ')}</TableCell>
                <TableCell>{dayjs.unix(weather?.data.sys.sunset).utc().format('ddd MMM D YYYY HH:mm:ss [GMT]ZZ')}</TableCell>
                <TableCell>{weather?.data.main.temp}K</TableCell> */}
              </TableRow>
        



       </TableBody>
       </Table>
       </TableContainer>
       <h1 style={{ textAlign: "center" }}>Time-Temperature Graphical Chart</h1>
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
           <BarChart/>
           </div>
        </div>
      </Wrapper>
      </ThemeProvider>
    </>
  )
}

export default Index

