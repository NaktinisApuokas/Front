import React from "react";
import {Nav, Navbar, Container} from 'react-bootstrap';  
import {Outlet, Link} from 'react-router-dom';

export default function header() {
    return(
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
                    </Nav>  
                </Navbar.Collapse>  
                </Container>            
            </Navbar>   
            <Outlet />  
        </div>
           
    );
}