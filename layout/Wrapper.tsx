import React from 'react'
import Header from './Header'
import Footer from './Footer'

interface wrapperProps {
    children: JSX.Element | JSX.Element[];
  }


const Wrapper= ({children}: wrapperProps) => {

  
  return (
    <>
    <Header/>
    <br/>

    {children}


    <br/>
    <Footer/>

    
    
    
    </>
  )
}

export default Wrapper