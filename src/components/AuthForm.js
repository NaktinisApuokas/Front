import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import routes from '../constants/routes';
import { AuthContext } from '../App';

export default function AuthForm({title}) {
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();
  const { setRole } = useContext(AuthContext);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if(title === "Login"){
        const user = {
            userName: formData.UserName,
            password: formData.Password,
        };
        axios.post(`${routes}/login`, user)
        .then(x => {
          setRole(formData.UserName);
        })
        .catch((error) => { console.log(error); });
    }
    else{
        const user = {
            username: formData.UserName,
            email: formData.Email,
            password: formData.Password,
        };
        axios.post(`${routes}/register`, user).catch((error) => { console.log(error); });
    }
    navigate('/');
  };
  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">{title}</h1>

      <div className="mt-5">
        <label className="h3 form-label">User name</label>
        <input value={formData.UserName} name="UserName" type="text" className="form-control" onChange={handleChange} />
      </div>
    {title === "Register" &&
        <div className="mt-4">
            <label className="h3 form-label">Email</label>
            <input value={formData.Email} name="Email" type="text" className="form-control" onChange={handleChange} />
        </div>
    }
      <div className="mt-4">
        <label className="h3 form-label">Password</label>
        <input value={formData.Password} name="Password" type="text" className="form-control" onChange={handleChange} />
      </div>

      <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
    </form>
  );
}
