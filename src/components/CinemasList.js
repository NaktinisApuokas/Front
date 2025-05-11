import React, { useContext, useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import withLoading from '../HOCs/withLoading';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@mui/material';
import styles from './CinemasList.module.css';
import MovieDeleteButton from './MovieDeleteButton';
import MovieEditButton from './MovieEditButton';
import CinemaInfoButton from './CinemaInfoButton';
import { AuthContext } from '../App';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
const CinemaMap = lazy(() => import('./CinemaMap'));

function CinemasList({ cinemas, onDelete, city, cityImg }) {
  const { role } = useContext(AuthContext);
  const [selected, setSelected] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [mapMounted, setMapMounted] = useState(false);

  useEffect(() => {
    if (showMap) {
      const timer = setTimeout(() => {
        setMapMounted(true);
      }, 300); 
  
      return () => clearTimeout(timer);
    } else {
      setMapMounted(false); 
    }
  }, [showMap]);


  return (
    <div className={styles.InnerBackGround}>
      <div className={styles.ContainerWrapper}>
        {city && (
          <div
            className={styles.CityCard}
            style={{ backgroundImage: `url(${cityImg})` }}
          >
            <div className={styles.CityOverlay}></div>
            <h1 className={styles.CityText}>{city}</h1>
            <button
              className={styles.MapToggleButton}
              onClick={() => setShowMap(!showMap)}
            >
              {showMap ? "Slėpti kino teatrų žemėlapį" : "Rodyti kino teatrų žemėlapį"}
            </button>
          </div>
        )}
        <div className={`${styles.SlideMapWrapper} ${showMap ? styles.open : ""}`}>
          {mapMounted && (
            <Suspense fallback={<div>Kraunasi žemėlapis...</div>}>
              <CinemaMap
                cinemas={cinemas}
                selected={selected}
                setSelected={setSelected}
              />
            </Suspense>
          )}
        </div>
      </div>

      {role === 'admin' && (
        <div className="mt-5">
          <Link to="/add_cinema">
            <button className="btn btn-light btn-lg w-40">
              Pridėti kino teatrą
            </button>
          </Link>
        </div>
      )}

      {cinemas.length === 0 ? (
        <Card className={styles.NoCinemas}>Nėra kino teatrų</Card>
      ) : (
        cinemas.map((cinema) => (
          <Card key={cinema.id} className={styles.Card}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <CardMedia
                className={styles.Photo}
                component="img"
                image={cinema.img}
                alt={cinema.name}
                sx={{ width: '20%' }}
              />
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Link
                  className={styles.Link}
                  to="/movies"
                  state={{ type: cinema.id }}
                >
                  <Typography component="div" variant="h5">
                    {cinema.name}
                  </Typography>
                </Link>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Adresas: {cinema.address}
                </Typography>
              </CardContent>

              <Box className={styles.InfoButton}>
                <CinemaInfoButton linkstate={cinema} url={'/cinemainfo'} />
              </Box>

              {role === 'admin' && (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 5, margin: 2 }}>
                    <MovieEditButton linkstate={cinema} url={'/edit_cinema'} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 5, margin: 2 }}>
                    <MovieDeleteButton url={`${routes}/cinemas/${cinema.id}/`} onDelete={onDelete} />
                  </Box>
                </>
              )}
            </Box>
          </Card>
        ))
      )}
    </div>
  );
}

export default withLoading(CinemasList);
