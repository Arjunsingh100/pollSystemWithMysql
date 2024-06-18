import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'



function App() {
  

  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />}/>
      </Routes>
    </>
  )
}

export default App
