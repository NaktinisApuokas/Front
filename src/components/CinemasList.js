import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import withLoading from '../HOCs/withLoading';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import styles from './CinemasList.module.css';
import MovieDeleteButton from './MovieDeleteButton';
import MovieEditButton from './MovieEditButton';
import { AuthContext } from '../App'; 

function CinemasList({cinemas, onDelete}) {
  const { role } = useContext(AuthContext);
  return (
    <div className={styles.InnerBackGround}>
      {cinemas.length === 0 ?  <div className={styles.InnerBackGround}> Nėra kino teatrų</div>
        :
        cinemas.map(cinema => (
          <Card className={styles.Card}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <CardMedia
                className={styles.Photo}
                image={cinema.img}
              />
              <CardContent sx={{ flex: '1 0 auto' }}>
              <Link key={cinema.id} className={styles.Link} to="/movies" state={{ type: cinema.id }}>
                <Typography component="div" variant="h5">
                  {cinema.name}
                </Typography>
              </Link>
                
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Adresas: {cinema.address}
                </Typography>
              </CardContent>
              {(role === 'admin') && (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 5, margin: 2}}>
                    <MovieEditButton linkstate={ cinema } url={'/edit_cinema'}/>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 5, margin: 2}}>
                    <MovieDeleteButton url={`${routes}/cinemas/${cinema.id}/`} onDelete={onDelete}
                    />
                  </Box>
                </>
              )}
            </Box>
          </Card>
        ))  
      }
    </div>
  );
}
export default withLoading(CinemasList);
