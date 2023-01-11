import React from 'react';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import routes from '../constants/routes';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import withLoading from '../HOCs/withLoading';

function CinemasList({cinemas}) {
  return (
    <div>
      {cinemas.length === 0 ?  <div className="mb-3 p-5 text-center bg-light"> No Movies</div>
        :
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col" />
              <th scope="col" />
              <th scope="col" />
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {cinemas.map(cinema => (
              <tr key={cinema.id}>
                <td>{cinema.name}</td>
                <td>{cinema.address}</td>
                <td><Link style={{ textDecoration: 'none', color: 'Black' }} to="/movies" state={{ type: cinema.id }}> View Movies </Link></td>
                <td>{EditButton(cinema.id, '/edit_cinema')}</td>
                <td>{DeleteButton(`${routes}/cinemas/${cinema.id}/`)}</td>
                
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      }
    </div>
  );
}
 //<td><EditButton linkstate={cinema.id } url={'/edit_cinema'}/></td>
 //<td><DeleteButton url={`${routes}/cinemas/${cinema.id}/`}/></td>
export default withLoading(CinemasList);
