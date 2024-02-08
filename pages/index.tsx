import { axiosInstance } from '@/api/axiosinstance';
import {fetchWeatherDetails } from '@/api/functions/allApi';
import Wrapper from '@/layout/wrapper'
import { FormControl, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';

type IweatherPayload  = {
  lat: number
  lon: number
}



const Index = () => {
  const [place, setPlace] = useState<IweatherPayload | null>(null)
  // const [search, setSearch] = useState<boolean>(false);
  
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
    return <p>Loading...</p>;
  }

  return (
    <>
      <Wrapper>
        <div>
          <h1 style={{ textAlign: "center" }}>Weather Info</h1>
        </div>
        <div>
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
           <TableCell>Country</TableCell>
           <TableCell>Sunrise</TableCell>
           <TableCell>Sunset</TableCell>
           
       </TableRow>
       
       <TableRow>
                <TableCell>{weather?.data.name}</TableCell>
                <TableCell>{weather?.data.sys.country}</TableCell>
                <TableCell>{weather?.data.sys.sunrise}</TableCell>
                <TableCell>{weather?.data.sys.sunset}</TableCell>
              
              </TableRow>
        



       </TableBody>
       </Table>
       </TableContainer>

        </div>
      </Wrapper>
    </>
  )
}

export default Index

