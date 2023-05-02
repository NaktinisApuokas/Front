import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import withLoading from '../HOCs/withLoading';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import styles from '../css/styles.module.css';
import { ButtonGroup } from 'react-bootstrap';

function CinemasList({cinemas}) {
  return (
    <div className={styles.InnerBackGround}>
      {cinemas.length === 0 ?  <div className={styles.InnerBackGround}> No Cinemas</div>
        :
        cinemas.map(cinema => (
          <Link key={cinema.id} className={styles.Link} to="/movies" state={{ type: cinema.id }}>
            <Card sx={{ display: 'flex', marginTop: 4}}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardMedia
                  className={styles.Photo}
                  image={cinema.img}
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h5">
                    Kino Teatras: {cinema.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    Adresas: {cinema.address}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 5, margin: 2}}>
                  <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <EditButton linkstate={cinema.id } url={'/edit_cinema'}/>
                    <DeleteButton url={`${routes}/cinemas/${cinema.id}/`}/>
                  </ButtonGroup>
                </Box>
              </Box>
            </Card>
          </Link>
        ))  
      }
    </div>
  );
}
export default withLoading(CinemasList);
