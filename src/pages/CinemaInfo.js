import React, { useEffect, useState } from 'react';
import CinemaHallsList from '../components/CinemaHallsList';
import {useLocation}  from 'react-router-dom';
import routes from '../constants/routes';
import axios from 'axios';

export default function CinemaInfo() {
  const [halls, setHalls] = useState([]);
  const [cinemaInfo, setCinemaInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const id = location.state.id;

  const url = `${routes}/cinemas/${id}/cinemaHalls/`;

  const fetchCinemaHalls = async () => {

    const response = await axios.get(url);
    setHalls(response.data);
  };

  const fetchCinemaInfo = async () => {
    const response = await axios.get(`${routes}/cinemas/DetailedInfo`, { params: { id } });
    setCinemaInfo(response.data);

  };

  useEffect(() => {
    setIsLoading(true);
    fetchCinemaHalls();
    fetchCinemaInfo();
    setIsLoading(false);
  }, []);

  return (
    <div>
      <CinemaHallsList halls={halls} cinemaInfo={cinemaInfo} url={url} deleteUrl={url} id={id} onDelete={fetchCinemaHalls} isLoading={isLoading}/>
    </div>
  );
}
