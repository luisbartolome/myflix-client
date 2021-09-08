import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword ] = useState('');
  const [email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password,confirmPassword, email, Birthday);
    props.onRegistration(null);
  };

  return (
    <Container className="login-view" className="center">
      <h1 className="title">myFlix</h1>
    <Row >
        <Form className="login was-validated" noValidate >
            <Form.Group  controlId="formUsername">
              <h1>Registration</h1>
              <Form.Label>
                Username:
              </Form.Label>
              <Form.Control  
              required
              type="text" 
              maxLength={20}
              minLength={5}
              placeholder="Enter username" 
              value={username} 
              
              onChange={e => setUsername(e.target.value)} />
            <Form.Control.Feedback type="valid">
              awesome you did it!
            </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              This field is mandatory!
            </Form.Control.Feedback>
          </Form.Group>

      <Form.Group controlId="formGroupEmail">
      <Form.Label>Email:</Form.Label>
      <Form.Control
          required type="email"
          placeholder="Enter@E.mail"
          pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
          value={email}
          onChange={e => setEmail(e.target.value)} />
      <Form.Control.Feedback type="invalid" className="error form-info">
          Please enter a valid email.
      </Form.Control.Feedback>
      </Form.Group>
    
          <InputGroup hasValidation>
      <Form.Group controlId="formPassword">
        <Form.Label>
        Password:
        </Form.Label>
        <Form.Control 
          required 
          type="password" 
          placeholder="Enter your Password" 
          maxLength={50}
          minLength={6}
          value={password} 
          name="up"
          onChange={e => setPassword(e.target.value)} />
       <Form.Control.Feedback type="valid">
          awesome you did it!
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          This field is mandatory too!
        </Form.Control.Feedback>
      </Form.Group>
      </InputGroup>

      <Form.Group controlId="formConfirmPassword">
      <Form.Label>
      Confirm Password:
      </Form.Label>
      <Form.Control 
          required
          type="password" 
          placeholder="Confirm password" 
          value={confirmPassword} 
          name="up2"
          onChange={e => setConfirmPassword(e.target.value)}
          // isValid = {confirmPassword === password}
          />
        <Form.Control.Feedback type="valid">
          awesome you did it!
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          your password does not match!
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>
            Birthday:
        </Form.Label>
        <Form.Control 
        required
        type="date" 
        min="1900-01-01" 
        max={new Date().toISOString().split('T')[0]}
        placeholder="MM/DD/YYYY" 
        value={Birthday} 
        onChange={e => setBirthday(e.target.value)} />
        <Form.Control.Feedback type="valid">
          awesome you did it!
        </Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
          This field is mandatory too!
        </Form.Control.Feedback>
      </Form.Group>
      <Row>

      </Row>
      <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button> 
     
     <Button variant="secondary" type="submit">Back to login</Button>
    </Form>
    </Row>

    

</Container>

  );
}


RegistrationView.propType = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired
};