import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Header from "./header";
import Login from "../pages/Login";
import AllMoviesList from "./AllMoviesList";
import Register from "../pages/Register";
import CreateCinema from "../pages/CreateCinema";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<AllMoviesList />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="add_cinema" element={<CreateCinema />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}