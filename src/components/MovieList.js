import React, { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import withLoading from '../HOCs/withLoading';
import styles from './MovieList.module.css';
import { 
  Card,
  CardActions,
  IconButton,
  Typography,
  Collapse, 
  Box, 
  CardContent, 
  CardMedia, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  TextField } from '@mui/material';
import MovieEditButton from './MovieEditButton';
import MovieDeleteButton from './MovieDeleteButton';
import { AuthContext } from '../App';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import routes from '../constants/routes';


function MoviesList({movies, url, deleteUrl, id, onDelete}) {
  const [selectedCategory, setSelectedCategory] = useState("Visi");
  const [arrayToFilter, setArrayToFilter] = useState(movies);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [open, setOpen] = useState({});
  const [favorite, setFavorite] = useState(() => {
    const initialFavorites = {};
    movies.forEach((movie) => {
      initialFavorites[movie.id] = movie.isMarked;
    });
    return initialFavorites;
  });
  const { role } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState('');

  function CalculateTimeLeft(time) {
    var both  = time.split(':');
    var hours = both[0];

    var minutes = both[1];
    let today = new Date();
    
    var lefth = hours - today.getHours();
    var leftmin = minutes - today.getMinutes();

    if(leftmin < 0){
      leftmin = leftmin + 60;
      lefth--;
    }
    if(lefth < 0){
      lefth = "0";
    }
    if(lefth < 10){
      lefth = '0' + lefth;
    }
    
    if(leftmin < 10){
      leftmin = '0' + leftmin;
    }
    return(`${lefth}:${leftmin}`);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  function handleTimeChange(event) {
    setSelectedTime(event.target.value);
  }
  function handlePriceChange(event) {
    setSelectedPrice(event.target.value);
  }
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
  function filterGenre(array) {
    if (!selectedCategory || selectedCategory === "Visi") {
      return array;
    }
    return array.filter((movie) => movie.genre.toLowerCase().includes(selectedCategory.toLowerCase()));
  }

  const handleExpandClick = (id) => {
    setOpen((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleFavoriteClick = (id) => {
    setFavorite((prevState) => ({ ...prevState, [id]: !prevState[id] }));

    const isFavorite = favorite[id];

    if (isFavorite) {
      handleDelete(id);
    } else {
      handleSubmit(id);
    }
  };

  useEffect(() => {
    let result = movies;
    result = filterGenre(result);
    result = result.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setArrayToFilter(result);
  }, [selectedCategory, searchTerm, movies]);

  useEffect(() => {
    let result = arrayToFilter;
    
    if(selectedTime === "Artimiausi"){
      result.sort((a,b)=> a.screenings[0].time > b.screenings[0].time ? -1 : 1,)
    }
    if(selectedTime === "Tolimiausi"){
      result.sort((a,b)=> a.screenings[0].time > b.screenings[0].time ? 1 : -1,)
    }
    
    setArrayToFilter(result);
  }, [arrayToFilter, selectedTime]);
  
  useEffect(() => {
    let result = arrayToFilter;
    if(selectedPrice === "Pigiausi"){
      result.sort((a,b)=> parseFloat(a.screenings[0].price.split(' ')[0]) > parseFloat(b.screenings[0].price.split(' ')[0]) ? -1 : 1,)
    }
    if(selectedPrice === "Brangiausi"){
      result.sort((a,b)=> parseFloat(a.screenings[0].price.split(' ')[0]) > parseFloat(b.screenings[0].price.split(' ')[0]) ? 1 : -1,)
    }
    
    setArrayToFilter(result);
  }, [arrayToFilter, selectedPrice]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (movieid) => {

    const movieMark = {
      username: role
    };
    axios.post(`${routes}/cinemas/${id}/movies/${movieid}/movieMark`, movieMark)
      .catch(error => console.log(error));
  };

  const handleDelete = (movieid) => {
    const username = role;

    axios.delete(`${routes}/cinemas/${id}/movies/${movieid}/movieMark?username=${username}`)
      .catch(error => console.log(error));
  };

  return (
    <div className={styles.BackGround}>
      {(role === 'admin') && (
      <Box className={styles.AddButton}>
        <Link to="/add_movie" state={{ type: id }}><button className="btn btn-light text-dark btn-lg w-40"> Pridėti filmą </button></Link>
      </Box>
      )}
      <Box className={styles.Box}>
        <TextField
          label="Paieška"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <Typography variant="subtitle1" color="text.secondary" className={styles.FilterText}>
          <b>Filtruoti: </b>
        </Typography>
        <FormControl className={styles.Filter} >
          <InputLabel id="demo-simple-select-label">Žanras</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategory}
            label="Žanras"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">Visi</MenuItem>
            <MenuItem value="Animacija">Animacija</MenuItem>
            <MenuItem value="Nuotykių">Nuotykių</MenuItem>
            <MenuItem value="Romantinis">Romantinis</MenuItem>
            <MenuItem value="Drama">Drama</MenuItem>
            <MenuItem value="Fantastinis">Fantastinis</MenuItem>
            <MenuItem value="Siaubo">Siaubo</MenuItem>
            <MenuItem value="Šeimos">Šeimos</MenuItem>
            <MenuItem value="Trileris">Trileris</MenuItem>
            <MenuItem value="Veiksmo">Veiksmo</MenuItem>
            <MenuItem value="Komedija">Komedija</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="subtitle1" color="text.secondary" className={styles.FilterText}>
          <b>Rūšiuoti: </b>
        </Typography>
        <FormControl className={styles.Sort} >
          <InputLabel id="demo-simple-select-label">Laikas</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedTime}
            label="Laikas"
            className={styles.SortSelect}
            onChange={handleTimeChange}
          >
            <MenuItem value="Artimiausi">Artimiausi</MenuItem>
            <MenuItem value="Tolimiausi">Tolimiausi</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={styles.Sort} >
          <InputLabel id="demo-simple-select-label">Kaina</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedPrice}
            label="Kaina"
            onChange={handlePriceChange}
          >
            <MenuItem value="Pigiausi">Pigiausi</MenuItem>
            <MenuItem value="Brangiausi">Brangiausi</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {movies.length === 0 ?  <div className={styles.FullBackGround} ><button className="btn btn-light text-dark btn-lg w-40"> Nėra filmų </button></div>
        :
        arrayToFilter.map((movie) => (
        <Card className={styles.Card}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                <CardMedia
                  className={styles.Photo}
                  image={movie.img}
                  sx={{ objectFit: "fill", width: '15em', flex: '0 0 auto' }}
                />
                <CardContent sx={{ flex: '0 1 auto' }} className={styles.CardContent}>
                <Link className={styles.Link} key={movie.id} to="/screenings" state={{ type: id, movieid: movie.id }}>
                  <Typography component="div" variant="h4" className={styles.MovieTitle}>
                  {movie.title}
                  </Typography>
                </Link>
                <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
                  <b>Žanras: </b>{movie.genre}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
                <b>Trukmė: </b>{movie.duration}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  {movie.screenings.map((screening) => (
                    <Box className={styles.MovieTime}>
                      <Typography variant="h5" >
                      {screening.time}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Box>
                  <Typography variant="h6" className={styles.MovieGenre} >
                    Kaina: {movie.screenings[0].price}
                  </Typography>
                </Box>
                </CardContent>
                <CardActions sx={{ flex: '0 1 auto' }} className={styles.CardActions}>
                {(role === 'admin') && (
                  <>
                    <IconButton >
                      <MovieEditButton linkstate={{id, movie}} url={'/edit_movie'}/>
                    </IconButton>
                    <IconButton >
                      <MovieDeleteButton url={deleteUrl + movie.id}  onDelete={onDelete}/>
                    </IconButton>
                  </>
                )}

                <IconButton aria-label="add to favorites">
                {typeof role !== 'undefined' && role !== '' && (
                  favorite[movie.id]
                    ? <FavoriteIcon onClick={() => handleFavoriteClick(movie.id)} />
                    : <FavoriteBorderIcon onClick={() => handleFavoriteClick(movie.id)} />
                )}
                </IconButton>
               
                <ExpandMore
                  expand={open[movie.id]}
                  onClick={() => handleExpandClick(movie.id)}
                  aria-expanded={open[movie.id]}
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              </Box>
              <Collapse in={open[movie.id]} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography >
                    {movie.description}
                  </Typography>
                </CardContent>
              </Collapse>
          </Card>
        ))
      }
    </div>
  );
}

export default withLoading(MoviesList);