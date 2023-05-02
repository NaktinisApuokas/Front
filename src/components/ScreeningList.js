import React from 'react';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import withLoading from '../HOCs/withLoading';
import { Card, CardContent, CardMedia } from '@mui/material';
import styles from '../css/styles.module.css';

function ScreeningList({screenings, url, id, movieid, movie}) {
  return (
    <div className="p-5 text-center bg-light">
      <Card className={styles.Card} sx={{ display: 'flex', flexDirection: 'row' }}>
        <CardMedia
          className={styles.Photo}
          image="https://media.forumcinemas.lt/1012/Event_11605/landscape_large/BatuotasKatinasPukisII670x250.png"
        />
        <CardContent sx={{ flex: '1 0 auto' }}>
          <h1 className="mb-3"> {movie.title}</h1>
        </CardContent>
      </Card>
      <Link to="/add_screening" state={{ type: id, movieid }}><button className="btn btn-dark btn-lg w-40"> Add Screening </button></Link>
      {screenings.length === 0 ?  <div className="mb-3 p-5 text-center bg-light"> No screenings</div>
        :
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th scope="col">Time</th>
              <th scope="col">Price</th>
              <th scope="col">Empty Seat Number</th>
              <th scope="col" />
              <th scope="col" />
              <th scope="col" />
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {screenings.map(screening => (
              <tr key={screening.id}>
                <td>{screening.time}</td>
                <td>{screening.price}</td>
                <td>{screening.emptyseatnumber}</td>
                <td><a href="https://www.forumcinemas.lt/websales/movie/308713/#page=%2Fwebsales%2Fshow%2F895515%2F1229%2F"> <button className="btn btn-dark btn-lg w-40">Buy Tickets </button></a></td>
                <td><EditButton linkstate={{id, movieid, screeningid: screening.id}} url={'/edit_screening'}/></td>
                <td><DeleteButton url={`${url}/${screening.id}`}/></td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      }
    </div>
  );
}

export default withLoading(ScreeningList);
