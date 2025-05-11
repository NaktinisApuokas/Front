import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect } from "react";
import { 
  Box,
  Card,
  Typography
 } from '@mui/material';
 import allStyles from '../css/styles.module.css';

export default function ScanTicket() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText, decodedResult) => {
        console.log("QR code scanned:", decodedText);
      },
      (errorMessage) => {
        console.warn("Scan error:", errorMessage);
      }
    );

    return () => scanner.clear();
  }, []);

  return (
  <Box className={allStyles.NewBackGroundColor}>
    <Card id="reader" className={allStyles.FormCard}>
    </Card>
  </Box>
  );
}
