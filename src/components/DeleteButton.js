import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import Delete from '../services/Delete';
import styles from '../css/styles.module.css';

export default function DeleteButton({url}) {
  return (
  <Button className={styles.Buttons} onClick={() => Delete(url)} color="secondary" variant="contained" endIcon={<DeleteIcon />}>
    Delete
  </Button>);
}
