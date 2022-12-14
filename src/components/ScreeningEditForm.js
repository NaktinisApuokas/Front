import React, { useState } from 'react';
import axios from 'axios';
import routes from '../constants/routes';
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function ScreeningEditForm() {
    const [formData, setFormData] = useState([]);
    const screeningid = useLocation().state.screeningid;
    const movieid = useLocation().state.movieid;
    const id = useLocation().state.type;
    const navigate = useNavigate();

    const handleChange = (Event) => {
        setFormData({
            ...formData,
            [Event.target.name]: Event.target.value,
        });
    };

    const handleSubmit = (Event) => {
        Event.preventDefault();

        const postToCreate = {
            hall: formData.hall,
            price: formData.price,
            seatnumber: formData.seatnumber
        };

        axios.put(`${routes}/cinemas/${id}/movies/${movieid}/screening/${screeningid}`, postToCreate).catch(error => { console.log(error) });
        navigate("/screenings", {
            state: {
                type: id,
                movieid: movieid
            }
          });
    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Edit Screening</h1>

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

            <Link onClick={handleSubmit}><button className="btn btn-dark btn-lg w-100 mt-5">Submit</button></Link>
        </form>
    );
}