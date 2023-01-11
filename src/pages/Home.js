import React from 'react';
import { Link } from 'react-router-dom';
import CinemasList from '../components/CinemasList';
import routes from '../constants/routes';
import useQuery from '../hooks/useQuery';

export default function Home() {

  const url = `${routes}/cinemas`;
  const { data:Cinemas, isLoading } = useQuery(url);

  return (
    <div className="p-5 text-center bg-light">
      <h1 className="mb-3"> Cinemas List</h1>
      <div className="mt-5">
        <Link to="/add_cinema"><button className="btn btn-dark btn-lg w-40"> Add Cinema </button></Link>
      </div>
      <CinemasList cinemas={Cinemas} isLoading={isLoading}/>
    </div>
  );
}

