import React from 'react'
import './globals.css';
import { Routes, Route } from 'react-router-dom';
import SigninForm from './_auth/forms/SigninForm';
import { Home , Explore, Saved, EditPost,PostDetails ,Profile, UpdateProfile, AllUsers } from './_root/pages';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import {Toaster} from '@/components/ui/toaster'
import CreatePost from './_root/pages/CreatePost';
const App = () => {
  return (
      <main className='flex h-screen'>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route element={<AuthLayout/>}>
            <Route path='/sign-in' element={<SigninForm />} />
            <Route path='/sign-up' element={<SignupForm />} />
  
          </Route>
        
          {/* PRIVATE ROUTES */}
          <Route element={<RootLayout/>}>
            <Route path='/' element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/saved' element={<Saved />} />
            <Route path='/all-users' element={<AllUsers />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post/:id' element={<EditPost />} />
            <Route path='/post/:id' element={<PostDetails />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/update-profile/:id' element={<UpdateProfile />} />

          </Route>
        </Routes>
        <Toaster/>
      </main>
  )
}

export default App