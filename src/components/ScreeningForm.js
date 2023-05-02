import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../constants/routes';

export default function ScreeningForm({title}) {

  const [formData, setFormData] = useState([]);
  const [screeningid, setId] = useState([]);

  const movieid = useLocation().state.movieid;
  const id = useLocation().state.type;
  const navigate = useNavigate();
  const location = useLocation().state;
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if(location.screeningid !== null){
      setId(location.screeningid);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const screening = {
      time: formData.time,
      price: formData.price,
      emptySeatNumber: formData.emptySeatNumber,
    };

    if(title === "Edit"){
      axios.put(`${routes}/cinemas/${id}/movies/${movieid}/screening/${screeningid}`, screening).catch((error) => { console.log(error); });
    }
    else{
      axios.post(`${routes}/cinemas/${id}/movies/${movieid}/screening`, screening).catch((error) => { console.log(error); });
    }
    navigate('/screenings',  {state: { type: id, movieid: movieid }});
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">{title} Screening</h1>

      <div className="mt-5">
        <label className="h3 form-label">Screening time</label>
        <input value={formData.time} name="time" type="text" className="form-control" onChange={handleChange} />
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Screening price</label>
        <input value={formData.price} name="price" type="text" className="form-control" onChange={handleChange} />
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Screening empty seat number</label>
        <input value={formData.emptySeatNumber} name="emptySeatNumber" type="text" className="form-control" onChange={handleChange} />
      </div>

        <button className="btn btn-dark btn-lg w-100 mt-5"  onClick={handleSubmit}>Submit</button>
    </form>
  );
}
