import React, { useEffect, useState } from 'react';
import routes from '../constants/routes';
import HallForm from '../components/HallForm';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function AddHall() {
  const [seatTypes, setSeatTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const url = `${routes}/cinemaCompany/1/seatType/`;

  const cinemaID = location.state.cinemaID;

  const fetchSeatTypes = async () => {
    setIsLoading(true);
    const response = await axios.get(url);
    setIsLoading(false);
    setSeatTypes(response.data);
  };

  const refreshSeatTypes = async () => {
    setIsLoading(true);
    const response = await axios.get(url);
    setIsLoading(false);
    setSeatTypes(response.data);
  };

  useEffect(() => {
    fetchSeatTypes();
  }, []);

  return (
    <div>
      <HallForm title={"Sukurti"} seatTypes={seatTypes} refreshSeatTypes={refreshSeatTypes} state={{ cinemaID: cinemaID }}  />
    </div>
  );
}
