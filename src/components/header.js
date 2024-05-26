/* eslint-disable react-hooks/rules-of-hooks */
import { 
  Typography, 
  Box, 
  Divider, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AuthContext } from '../App';
import { makeStyles } from "@material-ui/core/styles";


function LogoutButton({ handleClick }) {
  return (
    <>
      <Link className={styles.Link} onClick={handleClick}>
        <Typography component="div" variant="h4" className={styles.HeaderText}>
          Atsijungti
        </Typography>
      </Link>
    </>
  );
}

export default function header() {
  const { role, setRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const handleClick = () => {
    setRole(null);
    navigate('/');
  };
  return (
    <Box className={styles.WholeHeader}>
      <Box className={styles.HeaderBox}>
        <Typography variant="h2" className={styles.Logo}>
          Kin
          <CameraOutlinedIcon className={styles.Icon}/>
          Teatras
        </Typography>
        <Divider orientation="vertical" flexItem classes={{root: 'white'}}>
          <CircleOutlinedIcon/>
        </Divider>
        <Accordion className={styles.Accordion}
          expanded={expanded}
          onChange={handleChange}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />} 
            className={styles.AccordionSummary}
            >
            <Link className={styles.Link} to="/" onClick={() => setExpanded(false)}>
              <Typography component="div" variant="h4" className={styles.HeaderText} >
                Kino teatrai
              </Typography>
            </Link>
          </AccordionSummary>
          <AccordionDetails className={styles.AccordionDetails}>
            <Divider orientation="horizontal" flexItem classes={{root: 'white'}}>
              <CircleOutlinedIcon/>
            </Divider>
            <Link className={styles.Link} to="/cinemas" state={{ city: 'Kaunas' }} onClick={() => setExpanded(false)}>
              <Typography component="div" variant="h4" className={styles.HeaderText}>
                Kaunas
              </Typography>
            </Link>
            <Divider orientation="horizontal" flexItem classes={{root: 'white'}}>
              <CircleOutlinedIcon/>
            </Divider>
            <Link className={styles.Link} to="/cinemas" state={{ city: 'Vilnius' }} onClick={() => setExpanded(false)}>
              <Typography component="div" variant="h4" className={styles.HeaderText}>
                Vilnius
              </Typography>
            </Link>
            <Divider orientation="horizontal" flexItem classes={{root: 'white'}}>
              <CircleOutlinedIcon/>
            </Divider>
            <Link className={styles.Link} to="/cinemas" state={{ city: 'Klaipėda' }} onClick={() => setExpanded(false)}>
              <Typography component="div" variant="h4" className={styles.HeaderText}>
                Klaipėda
              </Typography>
            </Link>
            <Divider orientation="horizontal" flexItem classes={{root: 'white'}}>
              <CircleOutlinedIcon/>
            </Divider>
            <Link className={styles.Link} to="/cinemas" state={{ city: 'Šiauliai' }} onClick={() => setExpanded(false)}>
              <Typography component="div" variant="h4" className={styles.HeaderText}>
                Šiauliai
              </Typography>
            </Link>
          </AccordionDetails>
        </Accordion>
        <Divider orientation="vertical" flexItem classes={{root: 'white'}}>
          <CircleOutlinedIcon/>
        </Divider>
        <Accordion className={styles.Accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />} 
            className={styles.AccordionSummary}
            >
            <Link className={styles.Link} to="/allmovies">
              <Typography component="div" variant="h4" className={styles.HeaderText} >
                Filmai
              </Typography>
            </Link>
          </AccordionSummary>
          <AccordionDetails className={styles.AccordionDetails}>
            <Divider orientation="horizontal" flexItem classes={{root: 'white'}}>
              <CircleOutlinedIcon/>
            </Divider>
            <Link className={styles.Link} to="/favorite">
              <Typography component="div" variant="h4" className={styles.HeaderText}>
                Mėgstamiausi Filmai
              </Typography>
            </Link>
          </AccordionDetails>
        </Accordion>
        <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: 'white' }}>
          <CircleOutlinedIcon />
        </Divider>
        {(!role) ? (
          <>
            <Link className={styles.Link} to="/login">
              <Typography component="div" variant="h4" className={styles.HeaderText}>
                Prisijungti
              </Typography>
            </Link>
            <Divider orientation="vertical" flexItem>
              <CircleOutlinedIcon/>
            </Divider>
            <Link className={styles.Link} to="/register">
              <Typography component="div" variant="h4" className={styles.HeaderText}>
                Registruoti
              </Typography>
            </Link>
          </>
        ) : (
          <>
            <Box className={styles.Link}>
              <Typography component="div" variant="h4" className={styles.HeaderText}>
                {role}
              </Typography>
            </Box>
            <LogoutButton handleClick={handleClick} />
          </>
        )}
      </Box>
      <Outlet />
    </Box>
  );
}
