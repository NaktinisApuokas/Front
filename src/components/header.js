/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Divider, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AuthContext } from '../App';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

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

  const handleClick = () => {
    setRole(null);
    navigate('/');
  };

  return (
    <Box>
      <Navbar expand="md" >
        <Container>
          <Navbar.Brand href="/">
            <Typography variant="h2">
              Kin
              <CameraOutlinedIcon className={styles.Icon}/>
              Teatras
            </Typography>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Divider orientation="vertical" flexItem classes={{root: 'white'}}>
                <CircleOutlinedIcon/>
              </Divider>
              <Link className={styles.Link} to="/">
                <Typography component="div" variant="h4" className={styles.HeaderText} >
                  Kino teatrai
                </Typography>
              </Link>
              <Divider orientation="vertical" flexItem classes={{root: 'white'}}>
                <CircleOutlinedIcon/>
              </Divider>
              <Accordion className={styles.Accordion}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />} 
                className={styles.AccordionSummary}
                >
                <Link className={styles.Link} to="/allmovies">
                  <Typography component="div" variant="h4" className={styles.HeaderText}>
                    Filmai
                  </Typography>
                </Link>
                </AccordionSummary>
                <AccordionDetails>
                  <Link className={styles.Link} to="/favorite">
                    <Typography component="div" variant="h4" className={styles.HeaderText}>
                      Mėgstamiausi Filmai
                    </Typography>
                  </Link>
                </AccordionDetails>
              </Accordion>
              <Divider orientation="vertical" flexItem classes={{root: 'white'}}>
                <CircleOutlinedIcon/>
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

                  {/* <Link className={styles.Link} onClick={() => handleClick()}>
                    <Typography component="div" variant="h4" className={styles.HeaderText}>
                      Atsijungti
                    </Typography>
                  </Link> */}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </Box>
  );
}
