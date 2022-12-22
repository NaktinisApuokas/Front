import React, { useContext } from 'react'
import { NameContext } from '../App'

const Modal = () => {
    const { className } = useContext(NameContext);
    return (
        <div style={{ minHeight: '100vh', display: "flex", justifyContent: 'center', alignItems: 'center', fontSize: '2rem' }}>Custom css {className}</div>
    )
}

export default Modal