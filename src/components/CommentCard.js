import React, { useState, useContext } from 'react';
import { IconButton, Typography, Box, Avatar } from '@mui/material';
import styles from './CommentCard.module.css';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import routes from '../constants/routes';
import axios from 'axios';
import { AuthContext } from '../App';

const CommentCard = ({ comment, id, movieid }) => {
  const [localScore, setLocalScore] = useState(comment.score);
  const [localTotalScore, setLocalTotalScore] = useState(comment.totalScore);
  const { role } = useContext(AuthContext);

  const updateCommentScore = async (newScore) => {
    
    let scoreChange = newScore;
    if (localScore === newScore) {
      scoreChange = -newScore; 
    } else if (localScore !== 0) {
      scoreChange -= localScore;
    }
    
    const commentToUpdate = {
      CommentId: comment.id,
      Score: localScore === newScore ? 0 : newScore,
      Username: role,
    };

    try {
      await axios.put(`${routes}/commentRating`, commentToUpdate);
      setLocalScore(commentToUpdate.Score);
      setLocalTotalScore(localTotalScore + scoreChange);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpVote = () => updateCommentScore(1);
  const handleDownVote = () => updateCommentScore(-1);
  return (
    <Box className={styles.comment}>
      <Box className={styles.avatarSection}>
        <Avatar src="https://www.shutterstock.com/image-vector/facebook-profile-icon-gray-person-260nw-465585245.jpg" className={styles.avatar} />
      </Box>
      <Box className={styles.textSection}>
        <Typography variant="subtitle2" component="div" className={styles.username}>
          {comment.username}
        </Typography>
        <Typography variant="body2" className={styles.commentText}>
          {comment.text}
        </Typography>
      </Box>
      <Box className={styles.scoreAndActions}>
        <Typography variant="body2" className={styles.commentTotalScore} style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {localTotalScore}
        </Typography>
        {(role) && (
          <Box className={styles.voteSection}>
            <IconButton onClick={handleUpVote}>
              {localScore === 1 ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}
            </IconButton>
            <IconButton onClick={handleDownVote}>
              {localScore === -1 ? <ThumbDownAltIcon /> : <ThumbDownAltOutlinedIcon />}
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CommentCard;