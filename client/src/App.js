import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './Pages/Home'
import Courses from './Pages/Courses'
import Lesson from './Pages/Lesson'
import Suporte from './Pages/Suporte'
import Perfil from './Pages/Perfil'
import api from './api.js'

function App() {
  return (
    <div className="Rotas">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/cursos" element={<Courses />}/>
          <Route path="/aula" element={<Lesson />}/>
          <Route path="/suporte" element={<Suporte />}/>
          <Route path="/perfil" element={<Perfil />}/>

        </Routes>
      </Router>

    </div>
  );
}

export default App;
