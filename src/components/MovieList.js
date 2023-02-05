import React from 'react';
import {Link} from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import withLoading from '../HOCs/withLoading';

function MoviesList({movies, url, id}) {
  const deleteUrl = `${url}/`;
  return (
    <div className="p-5 text-center bg-light">
      <h1 className="mb-3"> Movies List</h1>
      <Link to="/add_movie" state={{ type: id }}><button className="btn btn-dark btn-lg w-40"> Add Movie </button></Link>
      {movies.length === 0 ?  <div className="mb-3 p-5 text-center bg-light"> No Movies</div>
        :
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col" />
              <th scope="col" />
              <th scope="col" />
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>{movie.title}</td>
                <td>{movie.genre}</td>
                <td><Link className='text-link' to="/screenings" state={{ type: id, movieid: movie.id }}> View Screening </Link></td>
                <td><EditButton linkstate={{id, movie}} url={'/edit_movie'}/></td>
                <td><DeleteButton url={deleteUrl + movie.id}/></td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      }
    </div>
  );
}

export default withLoading(MoviesList);