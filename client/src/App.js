import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './Pages/Home'
import Courses from './Pages/Courses'

import api from './api.js'

function App() {
  return (
    <div className="Rotas">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/cursos" element={<Courses />}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
