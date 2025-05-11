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
  const [expandedMovie, setExpandedMovie] = useState(false);
  const [expandedProfile, setExpandedProfile] = useState(false);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  const handleClick = () => {
    setRole(null);
    navigate('/');
  };

  const handleAccordionToggle = () => {
    setExpandedMovie(prev => !prev);
  };


  const handleDetailsClick = () => {
    setExpandedMovie(false);
  };

  const handleAccordionProfileToggle = () => {
    setExpandedProfile(prev => !prev);
  };


  const handleDetailsProfileClick = () => {
    setExpandedProfile(false);
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
            <div onClick={(e) => e.stopPropagation()}>
              <Link className={styles.Link} to="/" onClick={() => setExpanded(false)}>
                <Typography component="div" variant="h4" className={styles.HeaderText} >
                  Kino teatrai
                </Typography>
              </Link>
            </div>
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
        <Accordion className={styles.Accordion}
          expanded={expandedMovie}
          onChange={handleAccordionToggle}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />} 
            className={styles.AccordionSummary}
            >
            <div onClick={(e) => e.stopPropagation()}>
              <Link className={styles.Link} to="/allmovies">
                <Typography component="div" variant="h4" className={styles.HeaderText}>
                  Filmai
                </Typography>
              </Link>
            </div>
          </AccordionSummary>
          <AccordionDetails className={styles.AccordionDetails}
              onClick={handleDetailsClick}
          >
            <Divider orientation="horizontal" flexItem classes={{root: 'white'}}>
              <CircleOutlinedIcon/>
            </Divider>
            <Link className={styles.Link} to="/favorite">
              <Typography component="div" variant="h4" className={styles.HeaderText}>
                Mėgstamiausi Filmai
              </Typography>
            </Link>
            <Divider orientation="horizontal" flexItem classes={{root: 'white'}}>
              <CircleOutlinedIcon/>
            </Divider>
            <Link className={styles.Link} to="/upcoming">
              <Typography component="div" variant="h4" className={styles.HeaderText}>
                Greitai kinuose
              </Typography>
            </Link>
          </AccordionDetails>
        </Accordion>
        <Divider orientation="vertical" flexItem classes={{root: 'white'}}>
          <CircleOutlinedIcon />
        </Divider>
        {(!role) ? (
          <>
            <Link className={styles.Link} to="/login">
              <Typography component="div" variant="h4" className={styles.HeaderText}>
                Prisijungti
              </Typography>
            </Link>
            <Divider orientation="vertical" flexItem classes={{root: 'white'}}>
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
            <Accordion className={styles.Accordion}
              expanded={expandedProfile}
              onChange={handleAccordionProfileToggle}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />} 
                className={styles.AccordionSummary}
                >
                <Typography component="div" variant="h4" className={styles.HeaderText}>
                  {role}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={styles.AccordionDetails}
                  onClick={handleDetailsProfileClick}
              >
                <Divider orientation="horizontal" flexItem classes={{root: 'white'}}>
                  <CircleOutlinedIcon/>
                </Divider>
                <Link className={styles.Link} 
                  to="/tickets">
                  <Typography component="div" variant="h4" className={styles.HeaderText} >
                    Bilietai
                  </Typography>
                </Link>
                <Divider orientation="horizontal" flexItem classes={{root: 'white'}}>
                  <CircleOutlinedIcon/>
                </Divider>
                <LogoutButton handleClick={handleClick} />
              </AccordionDetails>
            </Accordion>
          </>
        )}

        {(role == 'admin' || role == 'adminscan') ? (
            <>
              <Divider orientation="vertical" flexItem classes={{root: 'white'}}>
                <CircleOutlinedIcon/>
              </Divider>
              <Link className={styles.Link} to="/scanTickets">
                <Typography component="div" variant="h4" className={styles.HeaderText}>
                  Skanuoti bilietus
                </Typography>
              </Link>
            </>
        ) : (<></>)
      }

      </Box>
      <Outlet />
    </Box>
  );
}
