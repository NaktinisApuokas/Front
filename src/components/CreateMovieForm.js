import React, { useState } from 'react';
import axios from 'axios';
import routes from '../constants/routes';
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function CreateMovieForm() {
    const [formData, setFormData] = useState([]);
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
            title: formData.title,
            genre: formData.genre,
            description: formData.description
        };

        axios.post(`${routes}/cinemas/${id}/movies`, postToCreate).catch(error => { console.log(error) });
        navigate("/movies", {state: {type: id}});
    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Add Movie</h1>

            <div className="mt-5">
                <label className="h3 form-label">Movie title</label>
                <input value={formData.title} name="title" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Movie genre</label>
                <input value={formData.genre} name="genre" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Movie description</label>
                <input value={formData.description} name="description" type="text" className="form-control" onChange={handleChange} />
            </div>

            <Link onClick={handleSubmit}><button className="btn btn-dark btn-lg w-100 mt-5">Submit</button></Link>
        </form>
    );
}