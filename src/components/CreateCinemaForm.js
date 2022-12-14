import React, { useState } from 'react';
import axios from 'axios';
import routes from '../constants/routes';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateCinemaForm() {
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
            name: formData.name,
            address: formData.address
        };

        axios.post(`${routes}/cinemas`, postToCreate).catch(error => { console.log(error) });
        navigate("/");
    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Create new Cinema</h1>

            <div className="mt-5">
                <label className="h3 form-label">Cinema name</label>
                <input value={formData.name} name="name" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Cinema address</label>
                <input value={formData.address} name="address" type="text" className="form-control" onChange={handleChange} />
            </div>

            <Link onClick={handleSubmit}><button className="btn btn-dark btn-lg w-100 mt-5">Submit</button></Link>
        </form>
    );
}