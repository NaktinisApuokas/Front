import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../constants/routes';

export default function CinemaForm({title}) {
  const [formData, setFormData] = useState([]);
  const [id, setId] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(location.state !== null){
      setId(location.state);
    }
  }, [])
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cinema = {
      name: formData.name,
      img: formData.img,
      address: formData.address,
    };
    if(title === "Edit"){
        axios.put(`${routes}/cinemas/${id}`, cinema).catch((error) => { console.log(error); });
    }else{
      axios.post(`${routes}/cinemas`, cinema).catch((error) => { console.log(error); });
    }
    navigate('/');
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">{title} Cinema</h1>

      <div className="mt-5">
        <label className="h3 form-label">Cinema name</label>
        <input value={formData.name} name="name" type="text" className="form-control" onChange={handleChange} />
      </div>
      <div className="mt-5">
        <label className="h3 form-label">Cinema photo</label>
        <input value={formData.img} name="img" type="text" className="form-control" onChange={handleChange} />
      </div>
      <div className="mt-4">
        <label className="h3 form-label">Cinema address</label>
        <input value={formData.address} name="address" type="text" className="form-control" onChange={handleChange} />
      </div>

      <button className="btn btn-dark btn-lg w-100 mt-5" onClick={handleSubmit}>Submit</button>
    </form>
  );
}
