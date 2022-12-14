import React from 'react';
import Delete from './Delete';

export default function DeleteButton(id, url){
    return <button className="btn btn-dark btn-lg w-40" onClick={() => Delete(id, url)}>Delete</button>
}
