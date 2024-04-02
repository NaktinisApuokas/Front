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
  MenuItem } from '@mui/material';
import MovieEditButton from './MovieEditButton';
import MovieDeleteButton from './MovieDeleteButton';
import { AuthContext } from '../App';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import SpeakerNotesRoundedIcon from '@mui/icons-material/SpeakerNotesRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function MoviesList({movies, url, id}) {
  const [selectedCategory, setSelectedCategory] = useState("Visi");
  const [arrayToFilter, setArrayToFilter] = useState(movies);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedPrice, setSelectedPrice] = useState();
  const [open, setOpen] = useState({});
  const [favorite, setFavorite] = useState({});
  const { role } = useContext(AuthContext);
  const deleteUrl = `${url}/`;

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
  };

  useEffect(() => {
    let result = movies;
    result = filterGenre(result);
    setArrayToFilter(result);
}, [selectedCategory]);

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
  return (
    <div className={styles.BackGround}>
      {(role === 'admin') && (
      <Box className={styles.AddButton}>
        <Link to="/add_movie" state={{ type: id }}><button className="btn btn-light text-dark btn-lg w-40"> Add Movie </button></Link>
      </Box>
      )}
      <Box className={styles.Box}>
        <Typography variant="subtitle1" color="text.secondary" className={styles.FilterText}>
          <b>Filtruoti: </b>
        </Typography>
        <FormControl className={styles.Filter} >
          <InputLabel id="demo-simple-select-label">Žandras</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCategory}
            label="Žandras"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">Visi</MenuItem>
            <MenuItem value="Animacija">Animacija</MenuItem>
            <MenuItem value="Nuotykių">Nuotykių</MenuItem>
            <MenuItem value="Romantinis">Romantinis</MenuItem>
            <MenuItem value="Drama">Drama</MenuItem>
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
                  <b>Žandras: </b>{movie.genre}
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
                <IconButton aria-label="add to favorites">
                {typeof role !== 'undefined' && role !== '' && (
                  favorite[movie.id]
                    ? <FavoriteIcon onClick={() => handleFavoriteClick(movie.id)} />
                    : <FavoriteBorderIcon onClick={() => handleFavoriteClick(movie.id)} />
                )}
                </IconButton>
               
                <IconButton aria-label="share">
                  <SpeakerNotesRoundedIcon />
                </IconButton>
                <ExpandMore
                  expand={open[movie.id]}
                  onClick={() => handleExpandClick(movie.id)}
                  aria-expanded={open[movie.id]}
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
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
              <Collapse in={open[movie.id]} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography >
                  „Japonijos dienos Kaune WA“ renginių ciklo dalis – japoniško kino popietė ir anime
                  filmas „5 centimetrai per sekundę“.Vieno žinomiausių japonų anime filmų režisieriaus
                   Shinkai Makoto darbai Lietuvos žiūrovams jau yra šiek tiek žinomi, tarp jų –
                    Japonijoje populiarumo rekordus sumušusi juosta „Tavo vardas“, taip pat Lietuvoje 
                    jau rodyti anime filmai „Orų mergaitė“, „Ten už debesų“ bei „Suzume“. M.Shinkai 
                    pagrindinį dėmesį sutelkia į filmo personažų santykius, o fantazijos elementus 
                    panaudoja kaip foną. Jau anksčiau festivalyje rodytas animacinis filmas „5 centimetrai
                     per sekundę“ sugrįžta ir vėl.„5 centimetrai per sekundę“ - trijų dalių pasakojimas apie tai, 
                     kaip geriausi draugai Takakis ir Akari po pradinės mokyklos baigimo yra priversti išsiskirti. 
                     Puoselėdami romantiškus jausmus, jaunuoliai susirašinėja, kol galiausiai vieną žiemos dieną
                      Takakis sėda į traukinį ir išvyksta susitikti su Akari. Sėdint traukinyje, sugrįžta praeities prisiminimai, o susitikimas su Akari kas sekundę vis artėja. Režisierius: Makoto ŠinkaiOriginali filmo kalba: japonų k.Subtitrai: lietuvių k., anglų k.Nemokami bilietai platinami tos dienos seansui likus 1 val.
                   iki filmo pradžios „Forum Cinemas Kaunas“ kasose.©Makoto Shinkai/CoMix Wave Films
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