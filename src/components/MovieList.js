import React, { useContext } from 'react';
import {Link} from 'react-router-dom';
import withLoading from '../HOCs/withLoading';
import styles from './MovieList.module.css';
import { Card, Typography, Box, CardContent, CardMedia } from '@mui/material';
import MovieEditButton from './MovieEditButton';
import MovieDeleteButton from './MovieDeleteButton';
import { AuthContext } from '../App';
import image from "../css/background.jpg"; 

function MoviesList({movies, url, id}) {
  const { role } = useContext(AuthContext);
  const deleteUrl = `${url}/`;
  return (
    <div className={styles.BackGround} style={{ backgroundImage:`url(${image})` }}>
      {(role === 'admin') && (
      <div>
        <Link to="/add_movie" state={{ type: id }}><button className="btn btn-light text-dark btn-lg w-40"> Add Movie </button></Link>
      </div>
      )}
      {movies.length === 0 ?  <div className={styles.InnerBackGround} ><button className="btn btn-light text-dark btn-lg w-40"> No Movies </button></div>
        :
        movies.map((movie) => (
          <Link className={styles.Link} key={movie.id} to="/screenings" state={{ type: id, movieid: movie.id }}>
            <Card className={styles.Card}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardMedia
                  className={styles.Photo}
                  image={movie.img}
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h3" className={styles.MovieTitle}>
                {movie.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
                  <b>Žandras: </b>{movie.genre}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
                <b>Trukmė: </b>{movie.duration}
                </Typography>
                </CardContent>
                {(role === 'admin') && (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 5, margin: 2}}>
                      <MovieEditButton linkstate={{id, movie}} url={'/edit_movie'}/>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 5, margin: 2}}>
                      <MovieDeleteButton url={deleteUrl + movie.id}/>
                    </Box>
                  </>
                )}
              </Box>
            </Card>
          </Link>
        ))
      }
    </div>
  );
}

export default withLoading(MoviesList);