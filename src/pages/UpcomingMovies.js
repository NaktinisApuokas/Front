import React, { useEffect, useContext, useState } from 'react';
import UpcomingMovieList from '../components/UpcomingMovieList';
import routes from '../constants/routes';
import { AuthContext } from '../App';
import axios from 'axios';

export default function UpcomingMovies() {
  const { role } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = `${routes}/cinemas/1/movies/upcoming`;
  
  const deleteUrl = `${routes}/cinemas/1/movies/`;

  const fetchMovies = async () => {
    setIsLoading(true);
    const response = await axios.get(url);
    setIsLoading(false);
    setMovies(response.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <UpcomingMovieList movies={movies} url={url} deleteUrl={deleteUrl} onDelete={fetchMovies} isLoading={isLoading}/>
    </div>
  );
}
