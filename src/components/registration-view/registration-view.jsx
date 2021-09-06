import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword ] = useState('');
  const [email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password,confirmPassword, email, Birthday);
    props.onRegistration(username);
  };

  return (
    <div className="center">
      <h1 className="title">myFlix</h1>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control
            type="date"
            value={Birthday}
            placeholder="Enter your Birthday"
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <div className="middle">
          <Button type="submit" variant="dark" onClick={handleSubmit}>
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
}



RegistrationView.propTypes = {

    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date).isRequired,
    handleSubmit: PropTypes.func.isRequired
  };