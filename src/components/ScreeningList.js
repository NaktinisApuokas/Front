import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import withLoading from '../HOCs/withLoading';
import { 
  Box, 
  Card,
  CardContent, 
  CardMedia, 
  Typography, 
  Tab
 } from '@mui/material';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import styles from './ScreeningList.module.css';
import { AuthContext } from '../App';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import CommentForm from './CommentForm';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CommentCard from './CommentCard';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';

function ScreeningList({screenings, url, id, movieid, movie, comments, reviews, onReviewSubmitted, onCommentSubmitted}) {
  const { role } = useContext(AuthContext);
  const [value, setValue] = React.useState('1');
  const [expandedReview, setExpandedReview] = useState(false);
  const [expandedComment, setExpandedComment] = useState(false);

  
  const handleExpandedReviewChange = () => {
    setExpandedReview(!expandedReview);
  };

  const closeReviewAccordion  = () => {
    setExpandedReview(false); 
  };

  const handleExpandedCommentChange = () => {
    setExpandedReview(!expandedReview);
  };

  const closeCommentAccordion  = () => {
    setExpandedReview(false); 
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.InnerBackGround}>
      <Card >
        <Box className={styles.Card} sx={{ display: 'flex', flexDirection: 'row' }}>
          <CardMedia
            className={styles.Photo}
            image={movie.img}
            sx={{ objectFit: "fill", flex: '0 0 auto' }}
          />
          <CardContent sx={{ flex: '0 1 auto' }}>
          <Typography component="div" variant="h3" className={styles.MovieTitle}>
            {movie.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
            <b>Žandras: </b>{movie.genre}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" className={styles.MovieGenre}>
            <b>Trukmė: </b>{movie.duration}
          </Typography>
          <Box className={styles.Box}>
            <Typography variant="subtitle1" color="text.secondary" className={styles.MovieDescription}>
              {movie.description}
            </Typography>
          </Box>
          </CardContent>
        </Box>  
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} variant="fullWidth">
                  <Tab label="Seansai" value="1" />
                  <Tab label="Komentarai" value="2" />
                  <Tab label="Recenzijos" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
              {screenings.length === 0 ?  (
              <div className="mb-3 p-5 text-center text-light">
                <h1>
                  Nėra seansų
                </h1>
              </div>)
                :
                <MDBTable className={styles.Table}>
                  <MDBTableHead>
                    <tr>
                      <th scope="col">Laikas</th>
                      <th scope="col">Kaina</th>
                      <th scope="col">
                        <Typography variant="subtitle1">
                          Laisvų vietų skaičius
                        </Typography>
                      </th>
                      <th scope="col" />
                      {(role === 'admin') && (
                        <>
                          <th scope="col" />
                          <th scope="col" />
                        </>
                      )}

                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {screenings.map(screening => (
                      <tr key={screening.id}>
                        <td>
                          <Typography variant="h5" className={styles.TableText}>
                            {screening.time}
                          </Typography>
                        </td>
                        <td>
                          <Typography variant="h5" className={styles.TableText}>
                            {screening.price}
                          </Typography>
                        </td>
                        <td>
                          <Typography variant="h5" className={styles.TableText}>
                            {screening.emptyseatnumber}
                          </Typography>
                        </td>
                        <td>
                          <a href={screening.url} target="_blank" rel="noreferrer">
                            <button className="btn btn-dark btn-lg w-40">
                              Įsigyti bilietą
                              <OpenInNewIcon className={styles.OpenInNewIcon}/>
                            </button>
                          </a>
                        </td>
                        {(role === 'admin') && (
                          <>
                            <td>
                              <EditButton linkstate={{id, movieid, screeningid: screening.id}} url={'/edit_screening'}/>
                            </td>
                            <td>
                              <DeleteButton url={`${url}/${screening.id}`}/>
                            </td>
                          </>
                        )}

                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              }
              </TabPanel>
              <TabPanel value="2">
              {movie.comments?.length === 0 ?  (
              <div className="mb-3 p-5 text-center text-light">
                <h1>
                  Nėra komentarų
                </h1>
              </div>)
                :
                <div>
                  {(role) && (
                    <Accordion className={styles.AddComment} expandedComment={expandedComment} onChange={handleExpandedCommentChange}>
                      <AccordionSummary>
                        Pridėti komentarą
                      </AccordionSummary>
                      <AccordionDetails>
                        <CommentForm id={id} movieid={movieid} onCommentSubmitted={onCommentSubmitted} onCommentFormSubmitCloseAccordion={closeCommentAccordion}/>
                      </AccordionDetails>
                    </Accordion>
                  )}
                {comments?.map((comment) => (
                  <CommentCard comment={comment}>
                  </CommentCard>
                ))}
                </div>
              }
              </TabPanel>
              <TabPanel value="3"> {movie.comments?.length === 0 ?  (
                <div className="mb-3 p-5 text-center text-light">
                  <h1>
                    Nėra recenzijų
                  </h1>
                </div>)
                  :
                  <div>
                    {(role) && (
                    <Accordion className={styles.AddComment} expandedReview={expandedReview} onChange={handleExpandedReviewChange}>
                      <AccordionSummary>
                        Pridėti recenziją
                      </AccordionSummary>
                      <AccordionDetails>
                        <ReviewForm id={id} movieid={movieid} onReviewSubmitted={onReviewSubmitted} onReviewFormSubmitCloseAccordion={closeReviewAccordion}/>
                      </AccordionDetails>
                    </Accordion>
                    )}
                  {reviews?.map((review) => (
                    <ReviewCard review={review}>
                    </ReviewCard>
                  ))}
                  </div>
                }
              </TabPanel>
            </TabContext>
          </Box>
      </Card>
      {(role === 'admin') && (
      <Link to="/add_screening" state={{ type: id, movieid }} className={styles.AddButton}>
        <button className="btn btn-light btn-lg w-40"> Pridėti seansą </button>
      </Link>
      )}
      
    </div>
  );
}

export default withLoading(ScreeningList);
