import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import UsersDashboard from './Pages/UserPages/UsersDashboard'
import AdminDashboard from './Pages/UserPages/AdminDashboard'
import Profile from './Pages/UserPages/Profile'
import Polls from './Pages/UserPages/Polls'
import AdminMenu from './Pages/UserPages/AdminMenu'
import AllUsers from './Pages/UserPages/AllUsers'
import CreatePole from './Pages/UserPages/CreatePole'
import AdminPoll from './Pages/UserPages/AdminPoll'



function App() {


  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/polls' element={<Polls />} />
        <Route path='/admin' element={<AdminDashboard />}>
          <Route path='menu' element={<AdminMenu />} />
          <Route path='menu/allUsers' element={<AllUsers />} />
          <Route path='menu/createPole' element={<CreatePole />} />
          <Route path='menu/allPolls' element={<AdminPoll />}/>
        </Route>
        <Route path='/' element={<UsersDashboard />}>
        </Route>
      </Routes>
    </>
  )
}

export default App
