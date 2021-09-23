import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom'

import {
  Form,
  Button,
  Container,
  Card
} from 'react-bootstrap'

export default class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favouriteMovies: [],
    };
  }

  // code executed right after the component is added to the DOM.
  componentDidMount() {
    this.getUser();
  }

  getUser() {
    const username = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    axios
      .get(`https://backend-myflix1.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
          favouriteMovies: response.data.favouriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error, "getUser error");
      });
  }

  removeFavorite(e, movie) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete(`https://backend-myflix1.herokuapp.com/users/${username}/movies/${movie}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert('Movie was removed from your Favorites List.');
        this.componentDidMount();
        console.log(movie, "!!movie");
        console.log(response, "!!response");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    e.preventDefault();
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }


    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios({
      method: 'put',
      url: `https://backend-myflix1.herokuapp.com/users/${username}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        username: newUsername ? newUsername : this.state.username,
        password: newPassword ? newPassword : this.state.password,
        email: newEmail ? newEmail : this.state.email,
        birthday: newBirthday ? newBirthday : this.state.birthday,
      },
    })
      .then((response) => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
        });
        alert('Changes have been saved!');
        localStorage.setItem('user', this.state.username);
        // this.props.history.push(`/users/${username}`);
        // window.location.reload()
        // window.location.pathname = `/users/${username}`
        // console.log(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.setState({
      username: input
    });
  }

  setPassword(input) {
    this.setState({
      password: input
    });
  }

  setEmail(input) {
    this.setState({
      email: input
    });
  }

  setBirthday(input) {
    this.setState({
      birthday: input
    });
  }

  handleDeregister(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios
      .delete(`https://backend-myflix1.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted');
        // this.props.history.push(`/`);
        // window.location.reload()
        // window.location.pathname = `/`
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { favouriteMovies, validated } = this.state;
    const { movies } = this.props;
    const favourites = movies.filter(movie => favouriteMovies.indexOf(movie._id) > -1)

    return (
      <Container className='profile-view'>

        {/* FAVOURITE MOVIES LIST */}
        <Card className='profile-card' border='info'>
          <Card.Title className='profile-title'>Your Favorite Movies</Card.Title>
          {/* {favoriteMovies.length === 0 && <div className='card-content'>You don't have any favorite movies yet!</div>} */}
          <div className='favorites-container'>
            {favouriteMovies.length > 0 &&
              favourites.map(m => (
                <div>
                  <Link key={m._id} to={`/movies/${m._id}`}>
                    <Button variant="link">{m.title}</Button>
                  </Link>
                  <Button size='sm' className='profile-button remove-favorite' variant='danger' onClick={(e) => this.removeFavorite(e, m._id)}>
                    Remove
                  </Button>
                </div>
              ))
            }
          </div>
        </Card>

        <Card className='update-card' border='info'>
          <Card.Title>Update Your Profile:</Card.Title>
          <Card.Body>
            <Form noValidate validated={validated} className='update-form' onSubmit={(e) => this.handleUpdate(e, this.username, this.password, this.email, this.birthday)}>
              <Form.Group controlId='formBasicUsername'>
                <Form.Label className='form-label'>Username</Form.Label>
                <Form.Control type='text' placeholder='Change Username' onChange={() => this.setUsername(e.target.value)} pattern='[a-zA-Z0-9]{5,}' />
                <Form.Control.Feedback type='invalid'>Please enter a valid username with at least 5 alphanumeric characters.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='formBasicPassword'>
                <Form.Label className='form-label'>
                  Password<span className='required szwed-shop'>*</span>
                </Form.Label>
                <Form.Control type='password' placeholder='Current or New Password' onChange={(e) => this.setPassword(e.target.value)} pattern='.{5,}' />
                <Form.Control.Feedback type='invalid'>Please enter a valid password with at least 5 characters.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label className='form-label'>Email</Form.Label>
                <Form.Control type='email' placeholder='Change Email' onChange={(e) => this.setEmail(e.target.value)} />
                <Form.Control.Feedback type='invalid'>Please enter a valid email address.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId='formBasicBirthday'>
                <Form.Label className='form-label'>Birthday</Form.Label>
                <Form.Control type='date' placeholder='Change Birthday' onChange={(e) => this.setBirthday(e.target.value)} />
                <Form.Control.Feedback type='invalid'>Please enter a valid birthday.</Form.Control.Feedback>
              </Form.Group>
              <Button className='update-profile-button' type='submit' variant='info'>
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>


        <Card className='update-card'>
          <Card.Title className='profile-title'>Delete Your Profile</Card.Title>
          <Card.Subtitle className='text-muted'>If you delete your account, it cannot be recovered.</Card.Subtitle>
          <Card.Body>
            <Button className='button' variant='danger' onClick={(e) => this.handleDeregister(e)}>
              Click Here If You're Sure!
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  user: propTypes.shape({
    favouriteMovies: propTypes.arrayOf(
      propTypes.shape({
        _id: propTypes.string.isRequired
      })
    ),
    username: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    birthday: propTypes.instanceOf(Date),
  })
};
