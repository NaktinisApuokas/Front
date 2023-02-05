import React from 'react';
import Delete from '../services/Delete';

export default function DeleteButton({url}) {
  return <button className="btn btn-dark btn-lg w-40" onClick={() => Delete(url)}>Delete</button>;
}
