import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

import './login-view.scss'

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request 
    to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };
  
  const newUser = (e) =>{
    e.preventDefault();
    console.log(username, password);
      props.onLoggedIn(false)
      props.onRegistration(true)
  };

  return(
      
      <Container className="login-view" className="center">
      <h1 className="title">myFlix</h1>
      <Form.Group controlId="formUsername">
        <Form.Label>
          Username:
        </Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>
        Password:
        </Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      
      </Form.Group>

      <div className="middle"></div>
      <Button className="m-3" variant="info" type="submit" onClick={handleSubmit}
      >
        Login
      </Button>
      < Button className="m-3" variant="info" type="submit" onClick={newUser}>
        Register here
      </Button>
    </Container>
  
  );
}
  
LoginView.propType = {
  username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
};