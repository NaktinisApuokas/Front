import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import withLoading from '../HOCs/withLoading';
import { Card, Grid } from '@mui/material';
import styles from '../css/styles.module.css';

function CinemasList({cinemas}) {
  return (
    <div className="p-5 text-center bg-dark">
      {cinemas.length === 0 ?  <div className="mb-3 p-5 text-center bg-light"> No Cinemas</div>
        :
        cinemas.map(cinema => (
          <Link key={cinema.id} className={styles.Link} to="/movies" state={{ type: cinema.id }}>
            <Card className={styles.Card}>
              <Grid container spacing={0}>
                <Grid item xs={3}>
                  <img className={styles.Photo} alt={cinema.img} src={cinema.img}/>
                </Grid>
                <Grid item xs={4} className={styles.Text}>
                  <span className={styles.Text}><b>Kino Teatras: </b>{cinema.name}</span><br/>
                  <span className={styles.Text}><b>Adresas: </b>{cinema.address}</span>
                </Grid>
                <Grid item xs={3} className={styles.ButtonCard}>
                  <div className="d-grid gap-3">
                    <EditButton linkstate={cinema.id } url={'/edit_cinema'}/>
                    <DeleteButton url={`${routes}/cinemas/${cinema.id}/`}/>
                  </div>
                </Grid>
              </Grid>  
            </Card>
          </Link>
        ))  
      }
    </div>
  );
}
export default withLoading(CinemasList);
