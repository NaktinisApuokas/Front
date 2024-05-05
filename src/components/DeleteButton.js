import { Button, ThemeProvider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import DeleteComponent from '../services/Delete';
import styles from '../css/styles.module.css';
import theme from '../constants/theme';

export default function DeleteButton({url, onDelete}) {
  return (
    <DeleteComponent url={url} onDelete={onDelete}>
      <ThemeProvider theme={theme}>
        <Button className={styles.Buttons} color="secondary" variant="contained" endIcon={<DeleteIcon />}>
            Pašalinti
          </Button>
      </ThemeProvider>
  </DeleteComponent>
  );
}
