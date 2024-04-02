import React from 'react';
import { Typography, Box, Avatar } from '@mui/material';
import styles from './ReviewCard.module.css';

const ReviewCard = ({ review, id, movieid }) => {

  return (
    <Box className={styles.review}>
      <Box className={styles.avatarSection}>
        <Avatar src="https://www.shutterstock.com/image-vector/facebook-profile-icon-gray-person-260nw-465585245.jpg" className={styles.avatar} />
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="subtitle2" component="div" className={styles.username}>
          {review.username}
        </Typography>
        <Typography variant="body2" className={styles.reviewText}>
          {review.text}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReviewCard;