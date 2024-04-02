/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Divider, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import { AuthContext } from '../App';

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
                <Typography component="div" variant="h4">
                  Home
                </Typography>
              </Link>
              <Divider orientation="vertical" flexItem>
                <CircleOutlinedIcon/>
              </Divider>
              <Link className={styles.Link} to="/allmovies">
                <Typography component="div" variant="h4">
                  Filmai
                </Typography>
              </Link>
              <Divider orientation="vertical" flexItem>
                <CircleOutlinedIcon/>
              </Divider>
              {(!role) ? (
                <>              
                  <Link className={styles.Link} to="/login">
                    <Typography component="div" variant="h4">
                      Prisijungti
                    </Typography>
                  </Link>
                  <Divider orientation="vertical" flexItem>
                    <CircleOutlinedIcon/>
                  </Divider>
                  <Link className={styles.Link} to="/register">
                    <Typography component="div" variant="h4">
                      Registruoti
                    </Typography>
                  </Link>
                </>
              ) : (
                <>
                  <Box className={styles.Link}>
                    <Typography component="div" variant="h4">
                      {role}
                    </Typography>
                  </Box>
                  <Link className={styles.Link} onClick={() => handleClick()}>
                    <Typography component="div" variant="h4">
                      Atsijungti
                    </Typography>
                  </Link>
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
