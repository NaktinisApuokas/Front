import styles from './TicketModal.module.css';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import routes from '../constants/routes';
import { 
  Box,
  Typography
 } from '@mui/material';
import { AuthContext } from '../App';

export default function TicketModal({ screeningId, onClose }) {
  const { role, setRole } = useContext(AuthContext);
  const [seatTypes, setSeatTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [matrix, setMatrix] = useState([]);
  const [hoveredCell, setHoveredCell] = useState(null);
  const [cinemaHall, setCinemaHall] = useState();
  const [selectedSeats, setSelectedSeats] = useState([]);  
  const [screeningInfo, setScreeningInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const urlforseatType = `${routes}/cinemaCompany/1/seatType/`;
  const urlforCinemaHall= `${routes}/cinemas/1/cinemaHalls/ByScreeningID/`;
  const urlforScreening = `${routes}/cinemas/1/movies/1/screening/${screeningId}`;
  
  const fetchSeatTypes = async () => {
    setIsLoading(true);
    const response = await axios.get(urlforseatType);
    setIsLoading(false);
    setSeatTypes(response.data);
  };

  const fetchScreening = async () => {
    setIsLoading(true);
    const response = await axios.get(urlforScreening);
    setIsLoading(false);
    setScreeningInfo(response.data);
  };


  const fetchCinemaHall = async () => {
    try {
      const response = await axios.get(urlforCinemaHall, { params: { screeningId } });
      const data = response.data;
  
      setCinemaHall(data);
      setMatrix(data.matrix || []);

   if (!data?.matrix || data.matrix.length === 0){
        setMatrix([]);
      } 
      else{
        console.log(data);
        const correctedMatrix = data.matrix.map((row) => [...row]);

        for (let row = 0; row < correctedMatrix.length; row++) {
          for (let col = 0; col < correctedMatrix[row].length; col++) {
            const cell = correctedMatrix[row][col];

            if (cell && cell.width > 1) {
              for (let i = 1; i < cell.width; i++) {
                const nextCol = col + i;
                if (nextCol < correctedMatrix[row].length && !correctedMatrix[row][nextCol]) {
                  correctedMatrix[row][nextCol] = { merged: true };
                }
              }
            }
          }
        }

        setMatrix(correctedMatrix);
      }

    } catch (error) {
      console.error("Failed to fetch cinema hall:", error);
    }
  };

  const handleMouseDown = (rowIndex, colIndex) => {
    handleCellClick(rowIndex, colIndex);
  };
  
  const handleCellClick = (rowIndex, colIndex) => {
    const colCount = matrix?.[0]?.length || 0;
    const selectedSeat = matrix[rowIndex]?.[colIndex];
  
    if (!selectedSeat || selectedSeat.isTaken || selectedSeat.isReserved) return;
  
    const seatWidth = selectedSeat.width || 1;
  
    if (seatWidth > 1) {
      if (colIndex === colCount - 1) return;
  
      for (let i = colIndex + 1; i < colIndex + seatWidth; i++) {
        if (i >= colCount || (matrix[rowIndex][i] && matrix[rowIndex][i].width > 1)) {
          return;
        }
      }
    }
  
    const seatKey = `${rowIndex}-${colIndex}`;
    const isAlreadySelected = selectedSeats.some(seat => seat.key === seatKey);
  
    if (isAlreadySelected) {
      setSelectedSeats(prev => prev.filter(seat => seat.key !== seatKey));
    } else {
      setSelectedSeats(prev => [...prev, { key: seatKey, data: selectedSeat }]);
    }
  
    setMatrix(prevMatrix => {
      return prevMatrix.map((row, r) =>
        row.map((cell, c) => {
          if (r === rowIndex && c === colIndex) {
            return { ...selectedSeat, width: seatWidth };
          }
          if (r === rowIndex && c > colIndex && c < colIndex + seatWidth) {
            return { merged: true };
          }
          if (
            seatWidth === 1 &&
            r === rowIndex &&
            c === colIndex + 1 &&
            prevMatrix[rowIndex][colIndex]?.width > 1
          ) {
            return null;
          }
          return cell;
        })
      );
    });
  };
  
  
  useEffect(() => {
    if (screeningId) {
      fetchScreening();
      fetchSeatTypes();
      fetchCinemaHall();
    }
  }, [screeningId]);

  const OpenPaymentModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const ClosePaymentModal = () => {
    setIsModalOpen(false);
  };

  const CloseBothModals = () => {
    setIsModalOpen(false);
    onClose();
  };

 const handleSubmit = async (event) => {
    event.preventDefault();
  
    const mappedSeats = selectedSeats.map(seat => ({ 
      id: seat.data.id,
      location: seat.key,
      defaultPrice: seat.data.defaultPrice
    }));

    const payload = {
      seats: mappedSeats,
      Username: role,
      screeningId: screeningId,
      movieTitle: screeningInfo.movieTitle,
      movieTitleEng: screeningInfo.movieTitleEng, 
      cinemaName: screeningInfo.cinemaName,
      screeningDateTime: screeningInfo.screeningDateTime
    };

    try {
      const response = await axios.post(`${routes}/payment/create-checkout-session`, payload);

      window.location.href = response.data.sessionUrl;
    } catch (error) {
      console.error("Stripe error:", error);
    }
  };


  if (!screeningId) return null;


  return (
    <div className={styles.backdrop}>
      <div className={styles.content}>
        <button onClick={onClose} className={styles.closeButton}>
          X
        </button>
        <Box className={styles.FormBox}>
          <form className={styles.FormWidth}>
            <div className={styles.HallBox}>
              <div className={styles.MatrixDivider}>
                <div className={styles.SeatBox}>
                  <Typography className={styles.Title} variant="h3">Bilietų kainos
                  </Typography>
                  {seatTypes
                    .filter(seatType => seatType.defaultPrice > 0)
                    .map((seatType, rowIndex) => (
                    <div key={rowIndex} style={{ display: "flex", flexDirection: "row", gap: "16px", alignItems: "center" }}>
                      <div
                        key={rowIndex}
                        className={styles.SeatTypeIcon}
                        style={{
                          width: "37px", 
                          height: "37px",
                          borderRadius: "5px", 
                          cursor: "pointer", 
                        }}
                      >
                        <img
                          src={`data:image/png;base64,${seatType.logoData}`}
                          alt={seatType.name}
                          style={{
                            borderRadius: "5px", 
                            width: "100%", 
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div> {seatType.name} - {seatType.defaultPrice} €
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.Matrix}>
                  <div className={styles.MatrixBox} >
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

                        const isSelected = selectedSeats.some(seat => seat.key === `${rowIndex}-${colIndex}`);
                        const isReserved = cell?.isReserved;
                        const isTaken = cell?.isTaken;

                        let distance = 0;
                        
                        if (hoveredCell) {
                          const dx = hoveredCell.col - colIndex;
                          const dy = hoveredCell.row - rowIndex;
                          distance = Math.sqrt(dx * dx + dy * dy);
                        }

                        let border = `2px solid rgba(0, 0, 0, ${hoveredCell ? Math.max(0.05, 0.3 - distance * 0.1) : 0.05})`;
                        
                        if (isSelected) border = '3px solid green';
                        else if (isReserved) border = '3px solid orange';
                        else if (isTaken) border = '3px solid red';

                        if (cell?.IsTaken) {
                          console.log(`Seat at (${rowIndex}, ${colIndex}) is taken`);
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
                              border: border,
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
            <div style={{ marginTop: "20px", fontSize: "16px" }}>
              <strong>Vietų kiekis:</strong> {selectedSeats.length} <br />
              <strong>Bendra kaina:</strong> € {selectedSeats.reduce((sum, seat) => sum + seat.data.defaultPrice, 0).toFixed(2)}
            </div>
            {selectedSeats.length > 0 && (
              <button type="button" className="btn btn-dark btn-lg w-100 mt-5" onClick={handleSubmit}>Įsigyti</button>
            )}
          </form>
        </Box>
      </div>
    </div>
  );
}