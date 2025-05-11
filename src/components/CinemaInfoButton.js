import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styles from './MovieList.module.css';
import { Link } from 'react-router-dom';

export default function CinemaInfoButton({linkstate, url}) {
  return (
    <Link className={styles.Link} to={url} state={linkstate}>
          <InfoOutlinedIcon className={styles.Icon} />
    </Link>
  );
}
