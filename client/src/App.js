import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Board from './pages/Board';



function App() {
  return (<>
    <Router>
      <Routes>
        <Route path='/' element={<Board />} />
      </Routes>



    </Router>
    
  </>
  )
}

export default App;
