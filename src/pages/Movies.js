import React, { useEffect, useContext, useState } from 'react';
import MoviesList from '../components/MovieList';
import {useLocation}  from 'react-router-dom';
import routes from '../constants/routes';
import { AuthContext } from '../App';
import axios from 'axios';

export default function Movies({Isfavorite}) {
  const { role } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const id = !Isfavorite ? location.state.type : 0;

  let url = `${routes}/cinemas/${id}/movies/detailed?name=${encodeURIComponent(role || 'defaultName')}`;
  if(Isfavorite){
    url = `${routes}/cinemas/${id}/movies/favorite?name=${encodeURIComponent(role || 'defaultName')}`;
  }
  
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
      <MoviesList movies={movies} url={url} deleteUrl={deleteUrl} id={id} onDelete={fetchMovies} isLoading={isLoading}/>
    </div>
  );
}
