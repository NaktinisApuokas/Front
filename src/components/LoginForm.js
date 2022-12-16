import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import routes from '../constants/routes';
import { AuthContext } from './App';

export default function LoginForm() {
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();
  const { setName } = useContext(AuthContext);
  const handleChange = (Event) => {
    setFormData({
      ...formData,
      [Event.target.name]: Event.target.value,
    });
  };

  const handleSubmit = (Event) => {
    Event.preventDefault();

    const User = {
      userName: formData.UserName,
      password: formData.Password,
    };
    setName(User.userName);
    axios.post(`${routes}/login`, { User }).catch((error) => { console.log(error); });
    navigate('/');
  };
  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">Login</h1>

      <div className="mt-5">
        <label className="h3 form-label">User name</label>
        <input value={formData.UserName} name="UserName" type="text" className="form-control" onChange={handleChange} />
      </div>

      <div className="mt-4">
        <label className="h3 form-label">Password</label>
        <input value={formData.Password} name="Password" type="text" className="form-control" onChange={handleChange} />
      </div>

      <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
    </form>
  );
}
