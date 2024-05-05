import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../constants/routes';

export default function ScreeningForm({title}) {

  const [formData, setFormData] = useState([]);

  const movieid = useLocation().state.movieid;
  const id = useLocation().state.type;
  const navigate = useNavigate();
  const location = useLocation().state;

  const screening = location.screening;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (title === "Redaguoti" && screening) {
      setFormData({
        time: screening.time || '',
        price: screening.price || '',
        emptyseatnumber: screening.emptyseatnumber || '',
        url: screening.url || ''
      });
    }
  }, [title, screening]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const screeningToBack = {
      time: formData.time,
      price: formData.price,
      emptySeatNumber: formData.emptyseatnumber,
      url: formData.url,
    };

    if (title === "Redaguoti") {
      axios.put(`${routes}/cinemas/${id}/movies/${movieid}/screening/${screening.id}`, screeningToBack)
        .then(() => {
          navigate('/screenings', { state: { type: id, movieid: movieid } });
        })
        .catch((error) => { console.log(error); });
    } else {
      axios.post(`${routes}/cinemas/${id}/movies/${movieid}/screening`, screeningToBack)
        .then(() => {
          navigate('/screenings', { state: { type: id, movieid: movieid } });
        })
        .catch((error) => { console.log(error); });
    }
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">{title} seansą</h1>

      <div className="mt-5">
        <label className="h3 form-label">Seanso laikas</label>
        <input value={formData.time} name="time" type="text" className="form-control" onChange={handleChange} />
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Seanso kaina</label>
        <input value={formData.price} name="price" type="text" className="form-control" onChange={handleChange} />
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Bilietų įsigijimo nuoroda</label>
        <input value={formData.url} name="url" type="text" className="form-control" onChange={handleChange} />
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Tuščių vietų kiekis</label>
        <input value={formData.emptyseatnumber} name="emptyseatnumber" type="text" className="form-control" onChange={handleChange} />
      </div>

        <button className="btn btn-dark btn-lg w-100 mt-5"  onClick={handleSubmit}>Patvirtinti</button>
    </form>
  );
}
