import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import routes from '../constants/routes';
import axios from 'axios';
import DeleteButton from './DeleteButton';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import EditButton from "./EditButton";

export default function MoviesList(){
    const [isLoading, setLoading] = useState(true);
    const [screenings, setData] = useState([]);
    const movieid = useLocation().state.movieid;
    const id = useLocation().state.type;
    const url = routes + '/cinemas/' + id + "/movies/" + movieid + "/screening";
    const delete_url = url +'/';

    useEffect(() => {
      async function getData(url) {
        const getData = await axios.get(url);
        setData(getData.data);
      }
      getData(url);
      setLoading(false);
    }, [isLoading]);
  
    if (isLoading) {
      return <div className='mb-3 p-5 text-center bg-light'>Loading...</div>;
    }
    if(screenings.length > 0)
        return (
        <div className='p-5 text-center bg-light'>
            <Link to="/add_screening" state={{ type : id, movieid : movieid}}><button className="btn btn-dark btn-lg w-40"> Add Screenings </button></Link>
        <MDBTable>
            <MDBTableHead>
                <tr>
                    <th scope="col">Hall</th>
                    <th scope="col">Price</th>
                    <th scope="col">Seatnumber</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
            {screenings.map((screening) => (
                <tr key={screening.id}>
                    <td>{screening.hall}</td>
                    <td>{screening.price}</td>
                    <td>{screening.seatnumber}</td>
                    <td><button className="btn btn-dark btn-lg w-40"> Buy Tickets </button></td>
                    <td>{EditButton({ type: id, movieid : movieid, screeningid : screening.id}, "/edit_screening")}</td>
                    <td>{DeleteButton(screening.id, delete_url)}</td>
                </tr>
                ))
            }
            </MDBTableBody>
        </MDBTable>
        </div> 
        );
    return (
    <div className='mb-3 p-5 text-center bg-light'> No screenings
        <div className="mt-5">
            <Link to="/add_screening" state={{ type : id, movieid : movieid}}><button className="btn btn-dark btn-lg w-40"> Add Screenings </button></Link>
        </div>
    </div> );
}
  