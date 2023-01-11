import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../constants/routes';

export default function ScreeningForm({title}) {

  const [formData, setFormData] = useState([]);
  const { movieid } = useLocation().state;
  const id = useLocation().state.type;
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const screening = {
      hall: formData.hall,
      price: formData.price,
      seatnumber: formData.seatnumber,
    };

    if(title === "Edit"){
      const { screeningid } = useLocation().state;
      axios.put(`${routes}/cinemas/${id}/movies/${movieid}/screening/${screeningid}`, screening).catch((error) => { console.log(error); });
    }
    else{
      axios.post(`${routes}/cinemas/${id}/movies/${movieid}/screening`, screening).catch((error) => { console.log(error); });
    }
    navigate('/screenings', {
      state: {
        type: id,
        movieid
      },
    });
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">{title} Screening</h1>

      <div className="mt-5">
        <label className="h3 form-label">Screening Hall</label>
        <input value={formData.hall} name="hall" type="text" className="form-control" onChange={handleChange} />
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Screening price</label>
        <input value={formData.price} name="price" type="text" className="form-control" onChange={handleChange} />
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Screening seatnumber</label>
        <input value={formData.seatnumber} name="seatnumber" type="text" className="form-control" onChange={handleChange} />
      </div>

        <button className="btn btn-dark btn-lg w-100 mt-5"  onClick={handleSubmit}>Submit</button>
    </form>
  );
}
