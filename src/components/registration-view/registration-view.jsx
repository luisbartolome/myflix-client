import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password,confirmPassword, email, birthday);
    props.onRegister(username);
  };

  return (
    <form>
      <label>
        Username:
        <input
          type="text"
          placeholder="Enter Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label>
            Confirm password: 
            <input type="text" 
            placeholder="Re-write Password"
            required
            value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)}/>
      </label>
      
      <label>
        Email:
        <input
          type="email"
          placeholder="name@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Birthday:
        <input
          type="birthday"
          placeholder="dd/mm/aaaa"
          required
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </label>

      <button type="submit" onClick={username}>
        Submit
      </button>
    </form>
  );
}

RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired,
};