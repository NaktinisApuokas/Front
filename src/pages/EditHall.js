import React, { useEffect, useState } from 'react';
import routes from '../constants/routes';
import HallForm from '../components/HallForm';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function EditHall() {
  const [seatTypes, setSeatTypes] = useState([]);
  const [CinemaHall, setCinemaHall] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const urlforseatType = `${routes}/cinemaCompany/1/seatType/`;
  const urlforCinemaHall= `${routes}/cinemas/1/cinemaHalls/`;

  const cinemaID = location.state.cinemaID;

  const cinemaHallID = location.state.CinemaHall.id;

  const fetchCinemaHall = async () => {
    const response = await axios.get(urlforCinemaHall + cinemaHallID);
    setCinemaHall(response.data);
  };


  const fetchSeatTypes = async () => {
    const response = await axios.get(urlforseatType);
    setSeatTypes(response.data);
  };

  const refreshSeatTypes = async () => {
    setIsLoading(true);
    const response = await axios.get(urlforseatType);
    setIsLoading(false);
    setSeatTypes(response.data);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchSeatTypes();
    fetchCinemaHall();
    setIsLoading(false);
  }, []);

  return (
    <div>
      <HallForm title={"Redaguoti"} seatTypes={seatTypes} refreshSeatTypes={refreshSeatTypes} state={{ cinemaID: cinemaID }} HallInfo = {CinemaHall} />
    </div>
  );
}
