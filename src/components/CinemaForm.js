import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../constants/routes';

export default function CinemaForm({ title }) {
  const [formData, setFormData] = useState({
    name: '',
    img: '',
    address: ''
  });
  const navigate = useNavigate();
  const location = useLocation();

  const cinema = location.state;

  useEffect(() => {
    if (title === "Redaguoti" && cinema) {
      setFormData({
        name: cinema.name || '',
        img: cinema.img || '',
        address: cinema.address || ''
      });
    }
  }, [title, cinema]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cinemaToBack = {
      name: formData.name,
      img: formData.img,
      address: formData.address,
    };

    try {
      if (title === "Redaguoti") {
        await axios.put(`${routes}/cinemas/${cinema.id}`, cinemaToBack);
      } else {
        await axios.post(`${routes}/cinemas`, cinemaToBack);
      }
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">{title} kino teatrą</h1>

      <div className="mt-5">
        <label className="h3 form-label">Kino teatro pavadinimas</label>
        <input value={formData.name} name="name" type="text" className="form-control" onChange={handleChange} />
      </div>
      <div className="mt-5">
        <label className="h3 form-label">Kino teatro nuotrauka</label>
        <input value={formData.img} name="img" type="text" className="form-control" onChange={handleChange} />
      </div>
      <div className="mt-4">
        <label className="h3 form-label">Kino teatro adresas</label>
        <input value={formData.address} name="address" type="text" className="form-control" onChange={handleChange} />
      </div>

      <button className="btn btn-dark btn-lg w-100 mt-5" onClick={handleSubmit}>Patvirtinti</button>
    </form>
  );
}
