import React, {useState} from "react"
import axios from "axios";
import routes from '../constants/routes';
import { useNavigate } from "react-router-dom";

export default function RegisterForm(){
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
      username: formData.UserName,
      email: formData.Email,
      password: formData.Password
    };
    console.log("posttocreate:", postToCreate)
    console.log("url:", `${routes}/register`)
    axios.post(`${routes}/register`, postToCreate).catch(error => {console.log(error)});
    navigate("/");
  };
  return (
  <form className="w-100 px-5">
    <h1 className="mt-5">Register</h1>

    <div className="mt-5">
        <label className="h3 form-label">User name</label>
        <input value={formData.UserName} name="UserName" type="text" className="form-control" onChange={handleChange} />
    </div>

    <div className="mt-4">
        <label className="h3 form-label">Email</label>
        <input value={formData.Email} name="Email" type="text" className="form-control" onChange={handleChange} />
    </div>

    <div className="mt-4">
        <label className="h3 form-label">Password</label>
        <input value={formData.Password} name="Password" type="text" className="form-control" onChange={handleChange} />
    </div>

    <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
  </form>
  );
}