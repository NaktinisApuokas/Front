import React, { useState, useEffect, useContext }  from 'react';
import ScreeningList from '../components/ScreeningList';
import {useLocation}  from 'react-router-dom';
import routes from '../constants/routes';
import useQuery from '../hooks/useQuery';
import { AuthContext } from '../App';
import axios from 'axios';

export default function Screening() {
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const { role } = useContext(AuthContext);
  const movieid = useLocation().state.movieid;
  const id = useLocation().state.type;

  const url = `${routes}/cinemas/${id}/movies/${movieid}/screening`;
  const { data:screenings, isLoading } = useQuery(url);
   
  const urlformovie = `${routes}/cinemas/${id}/movies/${movieid}`;
  const { data:movie } = useQuery(urlformovie);
  
  const fetchReviews = async () => {
    const urlforReviews = `${routes}/cinemas/${id}/movies/${movieid}/review`;
    const response = await axios.get(urlforReviews);
    setReviews(response.data);
  };

  const fetchComments = async () => {
    const urlforComments = `${routes}/cinemas/${id}/movies/${movieid}/comment?name=${encodeURIComponent(role || 'defaultName')}`;
    const response = await axios.get(urlforComments);
    setComments(response.data);
  };

  useEffect(() => {
    fetchReviews();
    fetchComments();
  }, []);

  return (
    <div>
      <ScreeningList screenings={screenings}
        url={url}
        id={id}
        movieid={movieid}
        movie={movie} 
        isLoading={isLoading}
        comments={comments}
        reviews={reviews}
        onReviewSubmitted={fetchReviews}
        onCommentSubmitted={fetchComments}/>
    </div>
  );
}
