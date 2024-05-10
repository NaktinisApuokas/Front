import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import styles from './MovieList.module.css';
import DeleteComponent from '../services/Delete';

export default function MovieDeleteButton({ url, onDelete }) {
  return (
    <DeleteComponent url={url} onDelete={onDelete}>
      {/* <Box className={styles.DeleteButton}>
        <Box className={styles.InnerBox}> */}
          <DeleteIcon className={styles.Icon} />
        {/* </Box>
      </Box> */}
    </DeleteComponent>
  );
}
