import React from 'react';
import { Link } from "react-router-dom";

export default function EditButton(Linkstate, url){
    return (
        <Link style={{ textDecoration: 'none', color: 'Black' }} to={url} state= {Linkstate}>
            <button className="btn btn-dark btn-lg w-40">
                Edit
            </button>
        </Link>)
}
