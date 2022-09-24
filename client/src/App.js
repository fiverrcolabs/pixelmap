import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Board from './pages/Board'
import Login from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute'


function App() {
  return (
    <>
      <Router>
        <Routes>
          
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<ProtectedRoute />} >
            <Route path='/' element={<Board />} />
          </Route>


        </Routes>
      </Router>
    </>
  )
}

export default App
