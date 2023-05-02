import { Button } from '@mui/material';
import MovieCreationRoundedIcon from '@mui/icons-material/MovieCreationRounded';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/styles.module.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../constants/theme';

export default function EditButton({linkstate, url}) {
  return (
    <Link className={styles.Link} to={url} state={linkstate}>
      <ThemeProvider theme={theme}>
        <Button className={styles.Buttons} color="secondary" variant="contained" endIcon={<MovieCreationRoundedIcon />}>
          Edit
        </Button>
      </ThemeProvider>
    </Link>
  );
}
