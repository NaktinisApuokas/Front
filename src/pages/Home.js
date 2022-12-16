import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CinemasList from '../components/CinemasList';
import routes from '../constants/routes';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const url = `${routes}/cinemas`;

  useEffect(() => {
    async function getCinemas(url) {
      const getData = await axios.get(url);
      setData(getData.data);
    }
    getCinemas(url);
    setLoading(false);
  }, [isLoading]);

  if (isLoading) {
    return <div className="mb-3 p-5 text-center bg-light">Loading...</div>;
  }
  return (
    <div className="p-5 text-center bg-light">
      <h1 className="mb-3"> Cinemas List</h1>
      <div className="mt-5">
        <Link to="/add_cinema"><button className="btn btn-dark btn-lg w-40"> Add Cinema </button></Link>
      </div>
      {CinemasList(data)}
    </div>
  );
}
