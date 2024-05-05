import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CinemasList from '../components/CinemasList';
import routes from '../constants/routes';
import useQuery from '../hooks/useQuery';
import styles from '../css/styles.module.css';
import { Box } from '@mui/material';
import { AuthContext } from '../App';
import axios from 'axios';

export default function Home() {
  const { role } = useContext(AuthContext);
  const url = `${routes}/cinemas`;
  const { data: fetchedCinemas, isLoading } = useQuery(url);
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    setCinemas(fetchedCinemas);
  }, [fetchedCinemas]);

  const handleDeleteCinema = async () => {
    const url = `${routes}/cinemas`;
    const response = await axios.get(url);
    setCinemas(response.data);
  };

  useEffect(() => {
    handleDeleteCinema();
  }, []);

  return (
    <Box className={styles.BackGround}>
      {(role === 'admin') && (
      <div className="mt-5">
        <Link to="/add_cinema"><button className="btn btn-light btn-lg w-40"> Pridėti kino teatrą </button></Link>
      </div>
      )}
      <CinemasList cinemas={cinemas} isLoading={isLoading} onDelete={handleDeleteCinema}/>
    </Box>
  );
}

