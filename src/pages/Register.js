import React, {useState} from "react"
import axios from "axios";
import routes from '../constants/routes';

export default function Register(){
  const [formData, setFormData] = useState([]);

    const handleChange = (Event) => {
        setFormData({
            ...formData,
            [Event.target.name]: Event.target.value,
        });
    };

    const handleSubmit = (Event) => {
      Event.preventDefault();

        const postToCreate = {
          UserName: formData.UserName,
          Email: formData.Email,
          Password: formData.Password
        };
        axios.post(routes+'/register',{postToCreate})
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
            <h1 className="mt-5">Register</h1>

            <div className="mt-5">
                <label className="h3 form-label">User name</label>
                <input value={formData.UserName} name="title" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Email</label>
                <input value={formData.Email} name="title" type="text" className="form-control" onChange={handleChange} />
            </div>

            <div className="mt-4">
                <label className="h3 form-label">Password</label>
                <input value={formData.Password} name="content" type="text" className="form-control" onChange={handleChange} />
            </div>

            <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">Submit</button>
        </form>
  );
}