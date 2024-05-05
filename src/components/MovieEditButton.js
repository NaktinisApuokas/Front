import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';

export default function MovieEditButton({linkstate, url}) {
  return (
    <Link className={styles.Link} to={url} state={linkstate}>
        {/* <Box className={styles.MovieButton}>
          <Box className={styles.InnerBox}> */}
            <EditIcon className={styles.Icon}/>
          {/* </Box>  
        </Box> */}
    </Link>
  );
}
