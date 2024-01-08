import React from 'react';
import routes from '../constants/routes';
import useQuery from '../hooks/useQuery';
import AllMoviesList from '../components/AllMoviesList';

export default function AllMovies() {
  const id = 0;
  const url = `${routes}/all_movies`;
  const { data:movies, isLoading } = useQuery(url);
  return (
    <div>
      <AllMoviesList movies={movies} url={url} id={id} isLoading={isLoading}/>
    </div>
  );
}