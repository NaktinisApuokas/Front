import React from 'react';
import { Link } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import withLoading from '../HOCs/withLoading';


function ScreeningList({screenings, url, id, movieid}) {
    return (
      <div className="p-5 text-center bg-light">
        <h1 className="mb-3"> Screenings List</h1>
        <Link to="/add_screening" state={{ type: id, movieid }}><button className="btn btn-dark btn-lg w-40"> Add Screening </button></Link>
        {screenings.length === 0 ?  <div className="mb-3 p-5 text-center bg-light"> No screenings</div>
          :
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th scope="col">Hall</th>
                <th scope="col">Price</th>
                <th scope="col">Seatnumber</th>
                <th scope="col" />
                <th scope="col" />
                <th scope="col" />
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {screenings.map(screening => (
                <tr key={screening.id}>
                  <td>{screening.hall}</td>
                  <td>{screening.price}</td>
                  <td>{screening.seatnumber}</td>
                  <td><button className="btn btn-dark btn-lg w-40"> Buy Tickets </button></td>
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
