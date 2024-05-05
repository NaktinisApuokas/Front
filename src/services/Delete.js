import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Delete({ url, onDelete, children }) {

  const handleDelete = async () => {
    try {
      await axios.delete(url);
      onDelete();
    } catch (error) {
      console.error('Error deleting:', error);
    } finally {
    }
  };

  return (
    <div onClick={handleDelete} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );
}
