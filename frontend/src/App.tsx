import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Login } from './auth/pages/Login';
import { Register } from './auth/pages/Register';
import { Projects } from './projects/pages/Projects';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/*'} element={<Projects />} />
        <Route path={'/projects'} element={<Projects />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
