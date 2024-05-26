import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import routes from '../constants/routes';
import TextField from '@mui/material/TextField';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { IconButton } from '@mui/material';
import styles from './CommentForm.module.css';
import EmojiPicker from 'emoji-picker-react';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { AuthContext } from '../App';


export default function CommentForm({id, movieid, onCommentSubmitted, onCommentFormSubmitCloseAccordion}) {
  const { role } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    Comment: '',
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
 
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const commenttocreate = {
      Text: formData.Comment,
      Username: role
    };
    await axios.post(`${routes}/cinemas/${id}/movies/${movieid}/comment`, commenttocreate)
    .catch((error) => { console.log(error); });

    onCommentSubmitted();
    onCommentFormSubmitCloseAccordion();
    navigate('/screenings',  {state: { type: id, movieid: movieid }});
  };

  const getBorderColor = () => {
    const length = formData.Comment.length;
    if (length > 300) return 'error.main'; 
    return '#34454c'; 
  };

  const handleEmojiSelect = (emoji) => {

    setFormData({
      ...formData,
      Comment: formData.Comment + emoji.emoji,
    });
    setShowEmojiPicker(false);
  };

  return (
    <div>
      <TextField
          className={styles.TextField}
          id="comment"
          name="Comment"
          label={`${formData.Comment.length}/300`}
          multiline
          focused 
          rows={4}
          value={formData.Comment}
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
            borderColor: getBorderColor(), 
            },
            }, 
            '& .MuiInputLabel-root': { 
            color: getBorderColor(),
            },
            '& .MuiInputLabel-root.Mui-focused': { 
            color: getBorderColor(),
            },
            }}
            InputLabelProps={{
            shrink: true,
            }}
      />
      <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
        <SentimentSatisfiedAltIcon/>
      </IconButton>
      <IconButton onClick={handleSubmit}>
        <AddCircleOutlineRoundedIcon />
      </IconButton>
      <EmojiPicker
        className={styles.EmojiSelector}
        onEmojiClick={handleEmojiSelect}
        disableSearchBar
        disableSkinTonePicker
        open={showEmojiPicker}
        width='40em'
        emojiStyle='native'
        emojiVersion='4.0'
        previewConfig={{
          defaultEmoji: '',
          defaultCaption: '', 
          showPreview: false,
        }}
        pickerStyle={{ position: 'absolute', bottom: '50px', right: '10px' }}
      />
    </div>
  );
}