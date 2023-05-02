import React from 'react';
import {Link} from 'react-router-dom';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import withLoading from '../HOCs/withLoading';
import styles from '../css/styles.module.css';
import { Grid, Card, Typography } from '@mui/material';

function MoviesList({movies, url, id}) {
  const deleteUrl = `${url}/`;
  return (
    <div className={styles.InnerBackGround}>
      <h1 className="mb-3 text-light"> Movies List</h1>
      <Link to="/add_movie" state={{ type: id }}><button className="btn btn-light text-dark btn-lg w-40"> Add Movie </button></Link>
      {movies.length === 0 ?  <div className={styles.InnerBackGround}> No Movies</div>
        :
        movies.map((movie) => (
          <Link className={styles.Link} key={movie.id} to="/screenings" state={{ type: id, movieid: movie.id }}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <Card className={styles.Card} key={movie.id} >
                  <Grid container spacing={0.5}>
                    <Grid item xs={2}>
                      <img className={styles.Img} alt={movie.img} src={movie.img}/>
                    </Grid>
                    <Grid item xs={7} >
                      <Typography variant="h5" className={styles.Typography}>
                        {movie.title}
                      </Typography>
                      <span className={styles.Img}><b>Žandras: </b>{movie.genre}</span>
                      <span className={styles.Img}><b>Trukmė: </b>{movie.duration}</span>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card className={styles.ButtonCard} key={movie.id} >
                  <div className="d-grid gap-3">
                    <EditButton linkstate={{id, movie}} url={'/edit_movie'}/>
                    <DeleteButton url={deleteUrl + movie.id}/>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Link>
        ))
      }
    </div>
  );
}

export default withLoading(MoviesList);