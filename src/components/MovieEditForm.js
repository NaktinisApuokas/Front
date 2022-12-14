import React, { useState } from 'react';
import axios from 'axios';
import routes from '../constants/routes';
import { Link, useLocation, useNavigate } from "react-router-dom";



export default function MovieEditForm() {
    const id = useLocation().state.type;
    const movie = useLocation().state.movie;
    const [formData, setFormData] = useState([]);
    
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
            description: formData.description
        };

        axios.put(`${routes}/cinemas/${id}/movies/${movie.id}`, postToCreate).catch(error => { console.log(error) });
        navigate("/movies", {
            state: {
                type: id,
            }
          });
    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Edit Movie</h1>

            <div className="mt-4">
                <label className="h3 form-label">Movie description</label>
                <input value={formData.description} name="description" type="text" className="form-control" onChange={handleChange} />
            </div>

            <Link onClick={handleSubmit}><button className="btn btn-dark btn-lg w-100 mt-5">Submit</button></Link>
        </form>
    );
}