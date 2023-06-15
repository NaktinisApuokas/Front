import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import withLoading from '../HOCs/withLoading';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import styles from './ScreeningList.module.css';
import image from "../css/background.jpg"; 
import { AuthContext } from '../App';

function ScreeningList({screenings, url, id, movieid, movie}) {
  const { role } = useContext(AuthContext);

  return (
    <div className={styles.InnerBackGround} style={{ backgroundImage:`url(${image})` }}>
      <Card className={styles.Card}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <CardMedia
            className={styles.Photo}
            image={movie.img}
          />
          <CardContent sx={{ flex: '1 0 auto' }}>
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
      </Card>
      <Link to="/add_screening" state={{ type: id, movieid }}><button className="btn btn-light btn-lg w-40"> Add Screening </button></Link>
      {screenings.length === 0 ?  (
      <div className="mb-3 p-5 text-center text-light">
        <h1>
          No screenings
        </h1>
      </div>)
        :
        <MDBTable className={styles.Table}>
          <MDBTableHead>
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Price</th>
              <th scope="col">Empty Seat Number</th>
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
                  <Typography variant="subtitle1" className={styles.TableText}>
                    {screening.time}
                  </Typography>
                </td>
                <td>
                  <Typography variant="subtitle1" className={styles.TableText}>
                    {screening.price}
                  </Typography>
                </td>
                <td>
                  <Typography variant="subtitle1" className={styles.TableText}>
                    {screening.emptyseatnumber}
                  </Typography>
                </td>
                <td>
                  <a href={screening.url} target="_blank">
                    <button className="btn btn-dark btn-lg w-40">
                      Buy Tickets
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
    </div>
  );
}

export default withLoading(ScreeningList);
