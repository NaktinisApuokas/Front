import React from "react";
import styles from '../css/styles.module.css';
import { Typography } from '@mui/material';

export default function withLoading(Component) {
    return function WithLoadingComponent(props) {
        if(props.isLoading){
            return <Typography component="div" variant="h4" className={styles.LoadingText}>Duomenys kraunami...</Typography>;
        }

        return <Component {...props} />;
    }
}