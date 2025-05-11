import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../constants/routes';
import { 
  Box,
  Divider, 
  Card,
  Typography
 } from '@mui/material';
import allStyles from '../css/styles.module.css';
import styles from './HallForm.module.css';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import AddIcon from '@mui/icons-material/Add';
import AddSeatTypePopUp from './AddSeatTypePopUp';

export default function HallForm({ title, seatTypes, refreshSeatTypes, HallInfo = {} }) {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: HallInfo.name || '',
    rowSorting: HallInfo.rowSorting || 'topToBottom',
    colSorting: HallInfo.colSorting || 'LeftToRight'
  });
  const [rows, setRows] = useState(HallInfo.rows || 10);
  const [cols, setCols] = useState(HallInfo.cols || 20);
  const [matrix, setMatrix] = useState(HallInfo.matrix || []);
  const [selectedSeatType, setSelectedSeatType] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [HallID, setHallID] = useState(HallInfo.id);

  const navigate = useNavigate();
  const location = useLocation();

  const hall = location.state;
  const cinemaID = location.state.id;  

  const handleImageClick = (seatTypeId) => {
    setSelectedSeatType(seatTypeId);
  };

  const handleMouseDown = (rowIndex, colIndex) => {
    setIsMouseDown(true);
    handleCellClick(rowIndex, colIndex);
  };
  
  const handleMouseEnter = (rowIndex, colIndex) => {
    if (isMouseDown) {
      handleCellClick(rowIndex, colIndex);
    }
  };
  
  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleRowsChange = (e) => {
    const newRows = e.target.value;
    setRows(newRows);
    createMatrix(newRows, cols);
  };

  const handleColsChange = (e) => {
    const newCols = e.target.value;
    setCols(newCols);
    createMatrix(rows, newCols);
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (!selectedSeatType) return; 
  
    const seatTypeObject = seatTypes.find(seat => seat.id === selectedSeatType);
    if (!seatTypeObject) return; 

    const seatWidth = seatTypeObject.width || 1;

    if(seatWidth > 1) {
      if(colIndex == cols - 1){
        return;
      }
      for (let i = colIndex + 1; i < colIndex + seatWidth; i++) {
        if (i >= cols || (matrix[rowIndex][i] && matrix[rowIndex][i].width > 1)) {
          return;
        }
      } 
    }

    setMatrix(prevMatrix => {
      return prevMatrix.map((row, r) =>                                         
        row.map((cell, c) =>{
          if (r === rowIndex && c === colIndex) {
            return { ...seatTypeObject, width: seatWidth };
          }
          if (r === rowIndex && c > colIndex && c < colIndex + seatWidth) {
            return { merged: true };
          }
          if (seatWidth === 1 && r === rowIndex && c === colIndex + 1 && prevMatrix[rowIndex][colIndex]?.width > 1) {
            return null;
          }
          return cell;
        }) 
      );
    });
  };

  const handleAddSeatType = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    refreshSeatTypes();
  };

  const createMatrix = (newRows, newCols) => {
    const r = parseInt(newRows, 10);
    const c = parseInt(newCols, 10);
    if (isNaN(r) || isNaN(c) || r <= 0 || c <= 0) {
      return;
    }

    if(matrix && matrix.length > 0){
      return;
    }
    const newMatrix = Array.from({ length: rows }, () =>
                      Array.from({ length: cols }, () => null));
    setMatrix(newMatrix);
  };
  
  useEffect(() => {
    if (title === "Redaguoti" && HallInfo) {
      setFormData({
        name: HallInfo.name || '',
        rowSorting: HallInfo.rowSorting || 'topToBottom',
        colSorting: HallInfo.colSorting || 'LeftToRight'
      });
      setMatrix(HallInfo.matrix || []);
      setHallID(HallInfo.id);
    }
  }, [title, HallInfo]);

  useEffect(() => {
    createMatrix(rows, cols);
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hallToBack = {
      name: formData.name,
      RowSorting: formData.rowSorting,
      CollumnSorting: formData.colSorting,
      CellMatrix: matrix
    };

    try {
      if (title === "Redaguoti") {
        await axios.put(`${routes}/cinemas/${cinemaID}/cinemaHalls/${HallID}`, hallToBack);
      } else {
        await axios.post(`${routes}/cinemas/${cinemaID}/cinemaHalls`, hallToBack);
      }
      navigate('/cinemainfo', {state: { id: cinemaID }});
    } catch (error) {
      console.log(error);
    }
  };

  return ( 
    <Box className={allStyles.NewBackGroundColor}>
      <Card className={styles.FormCard}>
        <Typography className={styles.Title} variant="h2">{title} salę
        </Typography>
        <Box className={styles.FormBox}>
        <form className={styles.FormWidth}>
          <div>
            <label className="h3 form-label">Salės pavadinimas</label>
            <input value={formData.name} name="name" type="text" className={styles.FormField} onChange={handleChange} />
          </div>
          <div className={styles.HallBox}>
            <label className={styles.HallBoxLabel}>
              Eilių kiekis:
              <input type="number" value={rows} onChange={handleRowsChange}  className={styles.HallBoxInput}/>
            </label>
            <label className={styles.HallBoxLabel}>
              Maksimalus vietų skaičius eilėje:
              <input type="number" value={cols} onChange={handleColsChange} className={styles.HallBoxInput} />
            </label>
            <label className={styles.HallBoxLabel}>
              Eilių numeravimo tvarka:
              <select
                className={styles.DropDownList}
                name="rowSorting"
                value={formData.rowSorting}
                onChange={handleChange}
              >
                <option value="topToBottom">Nuo viršaus iki apačios</option>
                <option value="bottomToTop">Nuo apačios iki viršaus</option>
              </select>
            </label>
            <label className={styles.HallBoxLabel}>
              Kėdžių numeravimo tvarka:
              <select
                className={styles.DropDownList}
                name="colSorting"
                value={formData.colSorting}
                onChange={handleChange}
              >
                <option value="LeftToRight">iš kairės į dešinę</option>
                <option value="RightToLeft">iš dešinės į kairę</option>
              </select>
            </label>
            <div className={styles.MatrixDivider}>
              <div className={styles.SeatBox}>
                <Typography className={styles.Title} variant="h4">
                  Kėdžių tipai
                </Typography>
                <Divider flexItem className={styles.Divider}>
                  <CircleOutlinedIcon/>
                </Divider>
                <div className={styles.SeatTypes}>
                  <div className={styles.SeatTypeIcon}>
                    <AddIcon onClick={handleAddSeatType}/>
                  </div>
                  {seatTypes.map((seatType, rowIndex) => (
                    <div
                      key={rowIndex}
                      className={styles.SeatTypeIcon}
                      onClick={() => handleImageClick(seatType.id)}
                      style={{
                        width: "37px", 
                        height: "37px",
                        border: selectedSeatType === seatType.id ? "3px solid gray" : "none", 
                        borderRadius: "5px", 
                        cursor: "pointer", 
                      }}
                    >
                      <img
                        src={`data:image/png;base64,${seatType.logoData}`}
                        alt={seatType.name}
                        className={styles.SeatImage}
                        style={{
                          borderRadius: "5px", 
                          width: "100%", 
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.Matrix}>
                <div className={styles.MatrixGrid}>
                  <div 
                    className={styles.MatrixBox} 
                    onMouseUp={handleMouseUp} 
                  >
                 {matrix[0]?.map((_, colIndex) => ( 
                  <div key={colIndex} className={styles.MatricCollumn}>
                    {matrix.map((row, rowIndex) => { 


                      const cell = matrix[rowIndex][colIndex];
                      if (cell?.merged) {
                        return (
                          <div
                            key={rowIndex+ ',' + colIndex}
                            className={styles.EmptyCell} 
                            style={{
                              gridColumn: `span ${cell.width || 1}`, 
                              width: `${(cell.width || 1) * 40}px`, 
                            }}
                          />
                        );
                      }

                      let distance = 0;
                      if (hoveredCell) {
                        const dx = hoveredCell.col - colIndex;
                        const dy = hoveredCell.row - rowIndex;
                        distance = Math.sqrt(dx * dx + dy * dy);
                      }
                      return (
                        <div
                          key={rowIndex+ ',' + colIndex}
                          className={styles.MatrixCell}
                          onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                          onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex })}
                          onMouseLeave={() => setHoveredCell(null)}
                          style={{
                            gridColumn: `span ${cell?.width || 1}`,
                            width: `${(cell?.width || 1) * 40}px`,
                            border: `1px solid rgba(0, 0, 0, ${hoveredCell ? Math.max(0.05, 0.3 - distance * 0.1) : 0.05})`, 
                            transition: "background-color 0.3s ease",
                          }}
                        >
                          {cell && cell.logoData && (
                            <img
                              src={`data:image/png;base64,${cell.logoData}`}
                              alt={cell.name}
                              className={styles.SeatImage}
                              style={{
                                borderRadius: "5px",
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-dark btn-lg w-100 mt-5" onClick={handleSubmit}>Patvirtinti</button>
        </form>
        </Box>
      </Card>
      {showPopup && (
        <AddSeatTypePopUp  handleClose={closePopup}>
        </AddSeatTypePopUp>
      )}
    </Box>
  );
}
