import Modal from './Modal';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NameContext } from '../App';




export default function Input() {

  const [subbmited, setSubmitted] = useState(false);
  const { setName } = useContext(NameContext);
  const navigate = useNavigate()

  const handleChange = (event) => {
    setName(event.target.value);
  }

  const handleClick = () => {
    setSubmitted(true);
    setTimeout(() => {
      navigate('/styles/yourname');
    }, 2000)
  }

  if(subbmited){
    return <Modal />;
  }

  return (
      <div>
        <input placeholder="Enter your name" onChange={handleChange}></input>
        <button onClick={handleClick}>Submit</button>
      </div>
  )
}
