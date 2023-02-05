import React from 'react';
import { Link } from 'react-router-dom';

export default function EditButton({linkstate, url}) {
  return (
    <Link className='text-link' to={url} state={linkstate}>
      <button className="btn btn-dark btn-lg w-40">
        Edit
      </button>
    </Link>
  );
}
