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
import ViewHeadlineRoundedIcon from '@mui/icons-material/ViewHeadlineRounded';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import { AuthContext } from '../App';
const CinemaMap = lazy(() => import('./CinemaMap'));

function CinemasList({ cinemas, onDelete, city, cityImg }) {
  const { role } = useContext(AuthContext);
  const [selected, setSelected] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [mapMounted, setMapMounted] = useState(false);
  const [itemsPerRow, setItemsPerRow] = useState(2);

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

  const toggleItemsPerRow = () => {
    setItemsPerRow(prev => (prev === 2 ? 1 : 2));
  };

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

      {role === 'admin' ? (
        <div className={styles.AdminButtonRow}>
          <div className={styles.AdminButton}>
            <Link to="/add_cinema">
              <button className="btn btn-light btn-lg w-40">
                Pridėti kino teatrą
              </button>
            </Link>
          </div>
          <div className={styles.ButtonWrapper}>
            <button onClick={toggleItemsPerRow} className={styles.ToggleButton}>
              {itemsPerRow === 1 ? <ViewModuleRoundedIcon /> : <ViewHeadlineRoundedIcon />}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.ButtonRow}>
          <div className={styles.ButtonWrapper}>
            <button onClick={toggleItemsPerRow} className={styles.ToggleButton}>
              {itemsPerRow === 1 ? <ViewModuleRoundedIcon /> : <ViewHeadlineRoundedIcon />}
            </button>
          </div>
        </div>
      )}

      {cinemas.length === 0 ? (
        <Card className={styles.NoCinemas}>Nėra kino teatrų</Card>
      ) : (
        <div className={`${styles.Container} ${
          itemsPerRow === 2 ? styles.TwoPerRow : styles.OnePerRow
        }`}>
        {cinemas.map((cinema) => (
          <Card key={cinema.id} className={styles.Card}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <CardMedia
                className={styles.Photo}
                component="img"
                image={cinema.img}
                alt={cinema.name}
                sx={{ width: '20%',
                  height: '9em',
                  objectFit: 'contain',
                  objectPosition: 'center'
                 }}
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
              {role === 'admin' && (
                <>
                  <Box className={styles.InfoButton}>
                    <CinemaInfoButton linkstate={cinema} url={'/cinemainfo'} />
                  </Box>
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
        }</div>
      )}
    </div>
  );
}

export default withLoading(CinemasList);
