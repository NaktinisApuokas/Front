import React, { useEffect, useContext, useState } from 'react';
import routes from '../constants/routes';
import AllMoviesList from '../components/AllMoviesList';
import axios from 'axios';

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const id = 0;
  const url = `${routes}/all_movies`;

  const deleteUrl = `${routes}/cinemas/${id}/movies/`;

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
      <AllMoviesList movies={movies} url={url} id={id} deleteUrl={deleteUrl} onDelete={fetchMovies} isLoading={isLoading}/>
    </div>
  );
}