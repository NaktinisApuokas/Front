import React from 'react';
import MoviesList from '../components/MovieList';
import {useLocation}  from 'react-router-dom';
import routes from '../constants/routes';
import useQuery from '../hooks/useQuery';

export default function Movies() {
  const id = useLocation().state.type;
  const url = `${routes}/cinemas/${id}/movies`;
  const { data:movies, isLoading } = useQuery(url);
  return (
    <div>
      <MoviesList movies={movies} url={url} id={id} isLoading={isLoading}/>
    </div>
  );
}
