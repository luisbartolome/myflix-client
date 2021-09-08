import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function Header(props) {
  const [ username, setUsername ] = useState()

  const logout = ()=> {
    props.onLogOut()
  }
  console.log(localStorage.user)
   
        return (
        
           <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
            {'My Flix App'}
            </Navbar.Brand>
            
            {localStorage.user && 
            <div>
            <button variant="Link" onClick={logout}>Logout</button>
       
            <Link to={`/profile`}>
                    <Button variant="outline-primary">Profile</Button>
            </Link>
            <Link to={`/`}>
                    <Button variant="outline-primary">Main View</Button>
            </Link>
            </div>}
          </Navbar>
          
        );

}

export default Header;