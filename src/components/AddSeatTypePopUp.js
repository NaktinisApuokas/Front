import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/popup.module.css';
import routes from '../constants/routes';
import { AuthContext } from '../App';
import { Typography,
    Box} from '@mui/material';

const AddSeatTypePopUp = ({ handleClose }) => {
    const [formData, setFormData] = useState({
        Name: '',
        Price: '',
        Width: '',
        Logo: null
    });
    const navigate = useNavigate();
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData((prevFormData) => ({
          ...prevFormData,
          Logo: file, 
        }));
      };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formDataToSend = new FormData();
        formDataToSend.append('Name', formData.Name);
        formDataToSend.append('DefaultPrice', formData.Price.replace('.',','));
        formDataToSend.append('Width', formData.Width);
        if (formData.Logo) {
        formDataToSend.append('Logo', formData.Logo); 
        }
        try {
            await axios.post(`${routes}/cinemaCompany/1/seatType`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={handleClose}>X</button>
        <h2>Pridėti kedės tipą</h2>
        <form className={styles.FormWidth}>
            <Box>
                <Typography variant="h5">Kedės tipo pavadinimas</Typography>
                <input value={formData.Name} name="Name" type="text" className="form-control" onChange={handleChange} />
            </Box>
            <Box className="mt-4">
                <Typography variant="h5">Kaina</Typography>
                <input
                    value={formData.Price}
                    name="Price"
                    type="number"
                    min="0"
                    step="0.10"
                    className="form-control"
                    onChange={handleChange}
                />
            </Box>
            <Box className="mt-4">
                <Typography variant="h5">Plotis</Typography>
                <input
                    value={formData.Width}
                    name="Width"
                    type="number"
                    min="0"
                    step="1"
                    className="form-control"
                    onChange={handleChange}
                />
            </Box>
            <Box className="mt-4">
              <Typography variant="h5">Kėdės tipo logotipas</Typography>
              <input
                name="Logo"
                type="file"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*" 
              />
            </Box>
            <button className="btn btn-dark btn-lg w-100 mt-5" onClick={handleSubmit}>Pridėti</button>
        </form>
      </div>
    </div>
  );
};

export default AddSeatTypePopUp;
