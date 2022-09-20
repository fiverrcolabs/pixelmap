import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Board from './pages/Board'
import Login from './pages/Login'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Board />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
