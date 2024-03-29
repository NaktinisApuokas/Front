import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../constants/routes';

export default function MovieForm({title}) {
  const id = useLocation().state.type;
  const { movie } = useLocation().state;
  const [formData, setFormData] = useState([]);

  console.log(id);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(title === "Edit"){
      const movietoedit = {
        description: formData.description
      };
      axios.put(`${routes}/cinemas/${id}/movies/${movie.id}`, movietoedit).catch((error) => { console.log(error); });
    }
    else{
      const movietocreate = {
        title: formData.title,
        genre: formData.genre,
        img: formData.img,
        duration: formData.duration,
        description: formData.description
      };
      axios.post(`${routes}/cinemas/${id}/movies`, movietocreate).catch((error) => { console.log(error); });
    }
    navigate('/movies', {
      state: { type: id }
    });
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">{title} Movie</h1>

      {title === "Create" &&
        <div>
          <div className="mt-5">
            <label className="h3 form-label">Movie title</label>
            <input value={formData.title} name="title" type="text" className="form-control" onChange={handleChange} />
          </div>

          <div className="mt-4">
            <label className="h3 form-label">Movie genre</label>
            <input value={formData.genre} name="genre" type="text" className="form-control" onChange={handleChange} />
          </div>
          <div className="mt-4">
            <label className="h3 form-label">Movie img</label>
            <input value={formData.img} name="img" type="text" className="form-control" onChange={handleChange} />
          </div>
          <div className="mt-4">
            <label className="h3 form-label">Movie duration</label>
            <input value={formData.duration} name="duration" type="text" className="form-control" onChange={handleChange} />
          </div>
        </div>
      }
      
      <div className="mt-4">
        <label className="h3 form-label">Movie description</label>
        <input value={formData.description} name="description" type="text" className="form-control" onChange={handleChange} />
      </div>

      <button className="btn btn-dark btn-lg w-100 mt-5" onClick={handleSubmit}>Submit</button>
    </form>
  );
}
