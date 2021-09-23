import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header(props) { 
  const logout = ()=> {
    props.onLogOut()

  }
  console.log('the header just rendered')
  
  return(
      
    <Navbar expand="lg" bg="dark" variant="dark">
     <Container>
    <Navbar.Brand as={Link}to="/">
      My Flix App
    </Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link variant="Link" as={Link}to="/">Home</Nav.Link>
      <Nav.Link variant="Link" as={Link}to="/profile">Profile</Nav.Link>
      <Nav.Link variant="Link" onClick={logout}>Logout</Nav.Link>
     </Nav>
     </Container>
  </Navbar>
    
  );
  }


export default Header;