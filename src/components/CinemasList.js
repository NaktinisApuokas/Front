import React from 'react';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import routes from '../constants/routes';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const url = `${routes}/cinemas/`;

export default function CinemasList(cinemas) {
  return (
    <MDBTable>
      <MDBTableHead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Address</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {cinemas.map((cinema) => (
          <tr key={cinema.id}>
            <td>{cinema.name}</td>
            <td>{cinema.address}</td>
            <td><Link style={{ textDecoration: 'none', color: 'Black' }} to="/movies" state={{ type: cinema.id }}> View Movies </Link></td>
            <td>{EditButton({ type: cinema.id }, '/edit_cinema')}</td>
            <td>{DeleteButton(cinema.id, url)}</td>
          </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}
