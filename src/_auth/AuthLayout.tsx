import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

const AuthLayout = () => {
  const isAuthenticated=false;
  return (
   <>
    {isAuthenticated?
    <Navigate to='/'/>
    :
    <>
      <section   className='flex flex-1 justify-center items-center flex-col py10'>
       
        <Outlet/>
        
      </section>
      <img src={'/assets/images/side-img.svg'} className='hidden md:block h-screen w-1/2  md:w-1/3 object-cover bg-no-repeat object-left'/>
    </>}
   </>
  )
}

export default AuthLayout