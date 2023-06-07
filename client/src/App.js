import React, { useState, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom'
import Home from './Pages/Home'
import Courses from './Pages/Courses'
import Lesson from './Pages/Lesson'
import Suporte from './Pages/Suporte'
import Perfil from './Pages/Perfil'
import Admin from './Pages/Admin'
import CourseIndex from './Pages/CourseIndex'
import Terms from './Pages/Terms'
import Privacy from './Pages/Privacy'
import Login from './Pages/Login'
import api from './api.js'

import { AuthProvider, AuthContext } from './Contexts/auth'

function App() {

  const Private = ({children}) => {
    const { authenticated, loading } = useContext(AuthContext)

    if (loading) {
      return <div className='loading'>Carregando...</div>
    }

    if (!authenticated){
      return <Navigate to="/login" />
    }

    return children;
  }
  
  return (
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/cursos" element={<Courses />}/>
            <Route path="/aula" element={<Private> <Lesson /> </Private>}/>
            <Route path="/suporte" element={<Suporte />}/>
            <Route path="/perfil" element={<Private> <Perfil /> </Private>}/>
            <Route path='/admin' element={<Admin />}/>
            <Route path='/curso' element={<CourseIndex />}/>
            <Route path='/termos-e-condicoes' element={<Terms />} />
            <Route path='/politica-de-privacidade' element={<Privacy />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </AuthProvider>
        
      </Router>
  );
}

export default App;
