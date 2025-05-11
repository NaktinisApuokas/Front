import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/header';
import Tickets from './components/Tickets';
import Login from './pages/Login';
import Register from './pages/Register';
import AddCinema from './pages/AddCinema';
import EditCinema from './pages/EditCinema';
import CinemaInfo from './pages/CinemaInfo';

import AddScreening from './pages/AddScreening';
import Screening from './pages/Screening';
import EditScreening from './pages/EditScreening';

import Movies from './pages/Movies';
import AllMovies from './pages/AllMovies';
import AddMovie from './pages/AddMovie';
import EditMovie from './pages/EditMovie';
import UpcomingMovies from './pages/UpcomingMovies';
import AddUpcomingMovie from './pages/AddUpcomingMovie';
import EditUpcomingMovie from './pages/EditUpcomingMovie';

import PaymentSuccess from './pages/PaymentSuccess';

import AddHall from './pages/AddHall';
import EditHall from './pages/EditHall';
import ScanTicket from './pages/ScanTicket';

import './css/app.module.css';

export const AuthContext = createContext();

export default function App() {
  const [role, setRole] = useState('admin');
  const style = {
    backgroundColor: '#34454c', 
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
              <Route path="cinemas" element={<Home />} />
              <Route path="allmovies" element={<AllMovies />} />
              <Route path="favorite" element={<Movies Isfavorite={true} />} />

              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              <Route path="add_cinema" element={<AddCinema />} />
              <Route path="edit_cinema" element={<EditCinema />} />
              <Route path="cinemainfo" element={<CinemaInfo />} />

              <Route path="movies" element={<Movies Isfavorite={false} />} />
              <Route path="add_movie" element={<AddMovie />} />
              <Route path="edit_movie" element={<EditMovie />} />
              <Route path="upcoming" element={<UpcomingMovies />} />
              <Route path="add_upcomingmovie" element={<AddUpcomingMovie />} />
              <Route path="edit_upcomingmovie" element={<EditUpcomingMovie />} />


              <Route path="screenings/:id/:movieId" element={<Screening />} />
              <Route path="add_screening" element={<AddScreening />} />
              <Route path="edit_screening" element={<EditScreening />} />

              <Route path="add_hall" element={<AddHall />} />
              <Route path="edit_hall" element={<EditHall />} />

              <Route path="payment-success" element={<PaymentSuccess />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/scanTickets" element={<ScanTicket />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
    
  );
}
