import React from 'react';
import ScreeningList from '../components/ScreeningList';
import {useLocation}  from 'react-router-dom';
import routes from '../constants/routes';
import useQuery from '../hooks/useQuery';

export default function Screening() {
  const { movieid } = useLocation().state;
  const id = useLocation().state.type;
  const url = `${routes}/cinemas/${id}/movies/${movieid}/screening`;
  const { data:screenings, isLoading } = useQuery(url);

  return (
    <div>
      <ScreeningList screenings={screenings} url={url} id={id} isLoading={isLoading}/>
    </div>
  );
}
