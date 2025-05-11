import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';
import EditIcon from '@mui/icons-material/Edit';

export default function MovieEditButton({linkstate, url}) {
  return (
    <Link className={styles.Link} to={url} state={linkstate}>
      <EditIcon className={styles.Icon}/>
    </Link>
  );
}
