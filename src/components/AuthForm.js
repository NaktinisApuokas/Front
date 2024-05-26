import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import routes from '../constants/routes';
import { AuthContext } from '../App';
import { 
  Box,
  Button,
  Card,
  Typography
 } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './AuthForm.module.css';
import allStyles from '../css/styles.module.css';

export default function AuthForm({title}) {
  const [formData, setFormData] = useState({
    UserName: '',
    Password: '',
    Email: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setRole } = useContext(AuthContext);

  const hasUppercase = /[A-Z]/.test(formData.Password);
  const hasDigit = /\d/.test(formData.Password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(formData.Password);
  const hasValidLength = formData.Password.length >= 8;



  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.UserName || !formData.Password || (title === "Registruotis" && !formData.Email)) {
      setError('Užpildykite visus laukus');
      return;
    }

    const hasUppercase = /[A-Z]/.test(formData.Password);
    const hasDigit = /\d/.test(formData.Password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(formData.Password);
    const hasValidLength = formData.Password.length >= 8;

    if (!(hasUppercase && hasDigit && hasSpecialChar && hasValidLength)) {
      setError('Slaptažodis neatitinka reikalavimų');
      return;
    }

    if(title === "Prisijungti"){
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
    <Box className={allStyles.NewBackGroundColor}>
      <Card className={allStyles.FormCard}>
        <Typography className={styles.Title} variant="h2">{title}
        </Typography>
        <Box className={styles.FormBox}>
            <form className={styles.FormWidth}>
                <Box>
                    <Typography variant="h5">Prisijungimo vardas</Typography>
                    <input value={formData.UserName} name="UserName" type="text" className="form-control" onChange={handleChange} />
                </Box>
                {title === "Registruotis" &&
                    <Box className="mt-4">
                        <Typography variant="h5">Elektroninis paštas</Typography>
                        <input value={formData.Email} name="Email" type="text" className="form-control" onChange={handleChange} />
                    </Box>
                }
                <Box className="mt-4">
                    <Typography variant="h5">Slaptažodis</Typography>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            id="passwordInput"
                            value={formData.Password}
                            name="Password"
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            onChange={handleChange}
                        />
                        <Button onClick={togglePasswordVisibility} style={{ marginLeft: '8px' }}>
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </Button>
                    </Box>
                </Box>
                <button className="btn btn-dark btn-lg w-100 mt-5" onClick={handleSubmit}>Patvirtinti</button>
                {error && <Box className={styles.Error}>{error}</Box>}
            </form>
            <Card className={styles.PasswordValidation}>
                <Box>
                    Yra didžioji raidė: {hasUppercase ? <CheckIcon /> : <ClearIcon />}
                </Box>
                <Box>
                    Yra bent 8 simboliai: {hasValidLength ? <CheckIcon /> : <ClearIcon />}
                </Box>
                <Box>
                    Yra numeris: {hasDigit ? <CheckIcon /> : <ClearIcon />}
                </Box>
                <Box>
                    Yra specialus simbolis: {hasSpecialChar ? <CheckIcon /> : <ClearIcon />}
                </Box>
            </Card>
        </Box>
      </Card>
    </Box>
  );
}
