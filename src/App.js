import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/header';
import Login from './pages/Login';
import Register from './pages/Register';
import Movies from './pages/Movies';
import AddMovie from './pages/AddMovie';
import AddCinema from './pages/AddCinema';
import AddScreening from './pages/AddScreening';
import Screening from './pages/Screening';
import EditCinema from './pages/EditCinema';
import EditMovie from './pages/EditMovie';
import EditScreening from './pages/EditScreening';
import AllMovies from './pages/AllMovies';

import './css/app.module.css';

export const AuthContext = createContext();

export default function App() {
  const [role, setRole] = useState('');
  const style = {
    backgroundColor: '#f0f0f0', // Your desired background color
    minHeight: '100vh', // Ensure it covers the full viewport height
    margin: 0,
    padding: 0,
  };
  return (
    <div style={style}>
      <AuthContext.Provider value={{ role, setRole }}>
        <BrowserRouter  >
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<Home />} />
              <Route path="allmovies" element={<AllMovies />} />

              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              <Route path="add_cinema" element={<AddCinema />} />
              <Route path="edit_cinema" element={<EditCinema />} />

              <Route path="movies" element={<Movies />} />
              <Route path="add_movie" element={<AddMovie />} />
              <Route path="edit_movie" element={<EditMovie />} />

              <Route path="screenings" element={<Screening />} />
              <Route path="add_screening" element={<AddScreening />} />
              <Route path="edit_screening" element={<EditScreening />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
    
  );
}
