import React, { useState } from 'react';
import { Card, CardActions, IconButton, Typography, Collapse, Box, CardContent, CardMedia } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MovieEditButton from './MovieEditButton';
import MovieDeleteButton from './MovieDeleteButton';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import styles from './MovieList.module.css';

const MovieCard = ({ key, movie, role, deleteUrl }) => {
  const [expanded, setExpanded] = useState(false);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={styles.Card}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardMedia
                  className={styles.Photo}
                  image={movie.img}
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Link className={styles.Link} key={movie.id} to="/screenings" state={{ type: key, movieid: movie.id }}>
                  <Typography component="div" variant="h4" className={styles.MovieTitle}>
                  {movie.title}
                  </Typography>
                </Link>
                <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
                  <b>Žandras: </b>{movie.genre}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
                <b>Trukmė: </b>{movie.duration}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  {movie.screenings.map((screening) => (
                    <Typography variant="h5" className={styles.MovieGenre}>
                    {screening.time}
                    </Typography>
                  ))}
                </Box>
                <Box>
                  <Typography variant="h6" className={styles.MovieGenre} >
                    Kaina: {movie.screenings[0].price}
                  </Typography>
                </Box>
                </CardContent>
                <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              
                {(role === 'admin') && (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 5, margin: 2}}>
                      <MovieEditButton linkstate={{key, movie}} url={'/edit_movie'}/>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 5, margin: 2}}>
                      <MovieDeleteButton url={deleteUrl + movie.id}/>
                    </Box>
                  </>
                )}
              </Box>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>
                    TEXT
                  </Typography>
                  <Typography paragraph>
                    TEXT
                  </Typography>
                  <Typography paragraph>
                    TEXT
                  </Typography>
                </CardContent>
              </Collapse>
          </Card>
  );
};

export default MovieCard;
