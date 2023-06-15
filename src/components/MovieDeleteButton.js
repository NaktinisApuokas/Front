import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import styles from './MovieList.module.css';
import Delete from '../services/Delete';

export default function MovieDeleteButton({ url }) {
  return (
    <Box className={styles.DeleteButton} onClick={() => Delete(url)}>
      <Box className={styles.InnerBox}>
        <DeleteIcon className={styles.Icon}/>
      </Box>
    </Box>
  );
}
