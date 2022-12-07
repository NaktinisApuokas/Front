import React from "react";
import CinemasList from "../components/CinemasList";
import getCinemas from "../components/getCinemas";
import {Link} from 'react-router-dom';

//{CinemasList(getCinemas())}

export default function Home(){
  return(
    <div>
    <div className='p-5 text-center bg-light'>
      <h1 className='mb-3'> Cinemas List</h1>
      <div className="mt-5">
            <button className="btn btn-dark btn-lg w-40"><Link to="/add_cinema"> Add Cinema </Link></button>
          </div> 
      {CinemasList(getCinemas())}
    </div> 
    </div> 
  );
}