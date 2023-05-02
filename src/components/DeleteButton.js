import { Button, ThemeProvider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import Delete from '../services/Delete';
import styles from '../css/styles.module.css';
import theme from '../constants/theme';

export default function DeleteButton({url}) {
  return (
    <ThemeProvider theme={theme}>
      <Button className={styles.Buttons} color="secondary" onClick={() => Delete(url)} variant="contained" endIcon={<DeleteIcon />}>
          Delete
        </Button>
    </ThemeProvider>
  );
}
