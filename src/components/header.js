import React, { useContext } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from './App';

export default function header() {
  const { name } = useContext(AuthContext);
  return (
    <div>
      <Navbar bg="light" expand="md">
        <Container>
          <Navbar.Brand href="/">FobumCinema</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <div style={{ margin: '10px' }}>
                <Link to="/">Home</Link>
              </div>
              <div style={{ margin: '10px' }}>
                <Link to="/movies">Movies</Link>
              </div>
              <div style={{ margin: '10px' }}>
                <Link to="/login">Login</Link>
              </div>
              <div style={{ margin: '10px' }}>
                <Link to="/register">Register</Link>
              </div>
              {name && (
              <Nav.Link>
                Logged in as:
                {' '}
                {name}
              </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>

  );
}
