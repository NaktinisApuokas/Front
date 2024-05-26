import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  let { data: fetchedCinemas, isLoading } = useQuery(url);
  const [cinemas, setCinemas] = useState([]);
  const [city, setCity] = useState("kino teatrai");
  const [cityImg, setCityImg] = useState("https://visit.kaunas.lt/assets/NewsPage/6063/_resampled/FillWyIxMDUwIiwiNTI1Il0/KM-135.jpg");

  const location = useLocation();

  useEffect(() => {
    setCinemas(fetchedCinemas);
  }, [fetchedCinemas]);

  const fetchCinemas = async () => {
    const url = `${routes}/cinemas`;
    const response = await axios.get(url);
    setCinemas(response.data);
  };

  const fetchCinemasByCity = async (city) => {
    if(city !== null && city !== ""){
      try{
        const url = `${routes}/cinemas/ByCity`;
        const response = await axios.get(url, { params: { city } });
        isLoading = false;
        setCinemas(response.data);
      }
      catch{

      }
    }
  };

  useEffect(() => {
    fetchCinemas();
  }, []);

  useEffect(() => {
    if(location.state){
      setCity(location.state.city)
    }
    if(!location.state){
      fetchCinemas();
      setCity("kino teatrai");
    }
  }, [location.state]);

  useEffect(() => {
    if(city){
      fetchCinemasByCity(city);
    }
    switch(city) {
      case "Kaunas":
        setCityImg("https://visit.kaunas.lt/assets/NewsPage/6063/_resampled/FillWyIxMDUwIiwiNTI1Il0/KM-135.jpg");
        break;
      case "Vilnius":
        setCityImg("https://study-eu.s3.eu-west-1.amazonaws.com/uploads/image/path/6/wide_fullhd_lithuania-vilnius-2.jpg");
        break;
        case "Klaipėda":
          setCityImg("https://wikitravel.org/upload/shared//9/9e/Klaipeda_Banner.jpg");
        break;
        case "Šiauliai":
          setCityImg("https://www.visitsiauliai.lt/data/editable/large/Sunset_in_the_cIty.png");
        break;
      default:
        setCityImg("https://media.radissonhotels.net/image/destination-pages/localattraction/16256-118729-f63246394_3xl.jpg?impolicy=HotelHero");
    }
    if(!location.state){
      fetchCinemas();
    }
  }, [city]);

  return (
    <Box className={styles.BackGround}>
      <CinemasList cinemas={cinemas} isLoading={isLoading} onDelete={fetchCinemas} city={city} cityImg={cityImg}/>
    </Box>
  );
}

