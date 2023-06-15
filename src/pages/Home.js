import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CinemasList from '../components/CinemasList';
import routes from '../constants/routes';
import useQuery from '../hooks/useQuery';
import styles from '../css/styles.module.css';
import { Box } from '@mui/material';
import { AuthContext } from '../App';
import image from "../css/background.jpg"; 

export default function Home() {
  const { role } = useContext(AuthContext);
  const url = `${routes}/cinemas`;
  const { data:Cinemas, isLoading } = useQuery(url);

  return (
    <Box className={styles.BackGround} style={{ backgroundImage:`url(${image})` }}>
      {(role === 'admin') && (
      <div className="mt-5">
        <Link to="/add_cinema"><button className="btn btn-light btn-lg w-40"> Add Cinema </button></Link>
      </div>
      )}
      <CinemasList cinemas={Cinemas} isLoading={isLoading}/>
    </Box>
  );
}

