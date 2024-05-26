import React from "react";
import styles from '../css/styles.module.css';
import { Typography, Card, Box } from '@mui/material';

export default function withLoading(Component) {
    return function WithLoadingComponent(props) {
        if(props.isLoading){
            return (
                <Box className={styles.LoadingText}>
                    <Card className={styles.LoadingCard}>
                        <Typography component="div" variant="h4">
                            Duomenys kraunami...
                        </Typography>
                    </Card>
                </Box>
            )
        }
        return <Component {...props} />;
    }
}