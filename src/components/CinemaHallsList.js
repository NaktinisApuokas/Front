import React, { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import withLoading from '../HOCs/withLoading';
import styles from './CinemaHallsList.module.css';
import { 
  Card,
  CardActions,
  IconButton,
  Typography,
  Box, 
  CardContent, 
  CardMedia } from '@mui/material';
import MovieEditButton from './MovieEditButton';
import MovieDeleteButton from './MovieDeleteButton';
import { AuthContext } from '../App';
import axios from 'axios';
import routes from '../constants/routes';

function CinemaHallsList({halls, cinemaInfo, url, deleteUrl, id, onDelete}) {
  const { role } = useContext(AuthContext);

  return (
    <div className={styles.BackGround}>
       <Card className={styles.Card}>
          <Box sx={{ display: 'flex', flexDirection: 'row'  }}>
            <CardMedia
              className={styles.Photo}
              component="img"
              image={cinemaInfo.img}
              alt={cinemaInfo.name}
              sx={{ width: "30%" }}
            />
            <CardContent sx={{ flex: '1 0 auto' }}>
            <Link key={cinemaInfo.id} className={styles.Link} to="/movies" state={{ type: cinemaInfo.id }}>
              <Typography component="div" variant="h5">
                {cinemaInfo.name}
              </Typography>
            </Link>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Adresas: {cinemaInfo.address}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Salių kiekis: {cinemaInfo.cinemaHallsCount}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                Turi vietų neįgaliems: {cinemaInfo.hasDisabledSeats ? 'Turi'  : 'Neturi'}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      {(role === 'admin') && (
      <Box className={styles.AddButton}>
        <Link to="/add_hall" state={{ id: id }}><button className="btn btn-light text-dark btn-lg w-40"> Pridėti salę </button></Link>
      </Box>
      )}
      {halls?.length === 0 ?  <div className={styles.FullBackGround} ><button className="btn btn-light text-dark btn-lg w-40"> Nėra salių </button></div>
        :
        <div className={styles.CardGrid}>
        {halls?.map((CinemaHall) => (
        <Card className={styles.HallCard}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CardContent sx={{ flex: '0 1 auto' }} className={styles.CardContent}>
              <Link className={styles.Link} key={CinemaHall.id} to="/screenings" state={{ type: id, movieid: CinemaHall.id }}>
                <Typography component="div" variant="h4" className={styles.MovieTitle}>
                  {CinemaHall.name}
                </Typography>
              </Link>
              <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
                <b>Vietų skaičius: </b>{CinemaHall.numberOfSeats}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
                <b>Turi neįgaliems vietų: </b> {CinemaHall.hasDisabledSeats ? 'Turi'  : 'Neturi'}
              </Typography>
            </CardContent>

            {(role === 'admin') && (
              <CardActions className={styles.CardActions}>
                <IconButton size="small">
                  <MovieEditButton linkstate={{ id, CinemaHall }} url={'/edit_hall'} />
                </IconButton>
                <IconButton size="small">
                  <MovieDeleteButton url={deleteUrl + CinemaHall.id} onDelete={onDelete} />
                </IconButton>
              </CardActions>
              )}
            </Box>
        </Card>
        ))}
        </div>
      }
    </div>
  );
}

export default withLoading(CinemaHallsList);