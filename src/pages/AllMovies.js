import React from 'react';
import MoviesList from '../components/MovieList';
import routes from '../constants/routes';
import useQuery from '../hooks/useQuery';

export default function AllMovies() {
  const id = 0;
  const url = `${routes}/allmovies`;
  const { data:movies, isLoading } = useQuery(url);
  return (
    <div>
      <MoviesList movies={movies} url={url} id={id} isLoading={isLoading}/>
    </div>
  );
}