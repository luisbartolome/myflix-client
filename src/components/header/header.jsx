import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
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
    <Form-group>
      <FormControl type="text" placeholder="Search" />
    </Form-group>
    <Nav className="me-auto">
      <Nav.Link as={Link}to="/">Home</Nav.Link>
      <Nav.Link as={Link}to="/profile">Profile</Nav.Link>
      <Nav.Link onClick={logout}>Logout</Nav.Link>
     </Nav>
     </Container>
  </Navbar>
    
  );
  }


export default Header;