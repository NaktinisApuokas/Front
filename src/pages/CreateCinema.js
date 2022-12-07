import React, { useState } from 'react';
import axios from 'axios';
import routes from '../constants/routes';

export default function CreateCinema(props) {

    const [formData, setFormData] = useState([]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const postToCreate = {
            name: formData.name,
            address: formData.address
        };
        axios.post(routes + '/cinema',{postToCreate})
        .then(response => {
            console.log(response);
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Create new Cinema</h1>

            <div className="mt-5">
                <label className="h3 form-label">Cinema name</label>
                <input value={formData.name} name="title" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Cinema address</label>
                <input value={formData.address} name="content" type="text" className="form-control" onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
        </form>
    );
}