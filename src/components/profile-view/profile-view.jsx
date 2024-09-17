import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Button, Card, CardDeck, Form, Row } from 'react-bootstrap';
import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: '',
      Password: '',
      Email: '',
      Birthdate: '',
      FavoriteMovies: [],
      validated: null
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  updateDetails(details) { 
    this.setState({
      Username: details.Username,
      Email: details.Email,
      Birthdate: details.Birthday.slice(0, 10), // Strip off time part
      FavoriteMovies: details.FavoriteMovies,
      Password: '' // Always clear password field after updates
    });
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://backend-myflix1.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.updateDetails(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  removeFavouriteMovie() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');


    axios
      .delete(`https://backend-myflix1.herokuapp.com/users/${username}/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Movie was removed');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleUpdate(e) {
    this.setState({
      ...this.state,
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
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.put(`https://backend-myflix1.herokuapp.com/users/${username}`, {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthdate,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        alert('Saved Changes');
        this.updateDetails(response.data);
        localStorage.setItem('user', this.state.Username);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange(input) {
    this.setState({
      ...this.state,
      [input.name]: input.value
    })
  }

  handleDeleteUser(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete(`https://backend-myflix1.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open(`/`, '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const { movies } = this.props;

    return (
      <Row className="profile-view">
        <Card bg="dark" className="profile-card">
          <h2>Your Favorites Movies</h2>
          <Card.Body>
            {FavoriteMovies.length === 0 && <div className="text-center">Empty.</div>}

            <div className="favorites-movies ">
              {FavoriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                    return (
                      <CardDeck className="movie-card-deck">
                        <Card className="favorites-item card-content" style={{ width: '16rem' }} key={movie._id}>
                          <Card.Img style={{ width: '18rem' }} className="movieCard" variant="top" src={movie.ImageURL} />
                          <Card.Body>
                            <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
                            <Button size='sm' className='profile-button remove-favorite' variant='danger' value={movie._id} onClick={(e) => this.removeFavouriteMovie(e, movie)}>
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      </CardDeck>
                    );
                  }
                })}
            </div>
          </Card.Body>

          <h1 className="section">Update Profile</h1>
          <Card.Body>
            <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e)}>

              <Form.Group controlId="formBasicUsername">
                <Form.Label className="form-label">Username</Form.Label>
                <Form.Control type="text" placeholder="Change Username" name="Username" value={this.state.Username} onChange={(e) => this.handleChange(e.target)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form-label">
                  Password
                </Form.Label>
                <Form.Control type="password" placeholder="New Password" name="Password" value={this.state.Password} onChange={(e) => this.handleChange(e.target)} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" placeholder="Change Email" name="Email" value={this.state.Email} onChange={(e) => this.handleChange(e.target)} />
              </Form.Group>

              <Form.Group controlId="formBasicBirthday">
                <Form.Label className="form-label">Birthdate</Form.Label>
                <Form.Control type="date" placeholder="Change Birthdate" name="Birthdate" value={this.state.Birthdate} onChange={(e) => this.handleChange(e.target)} />
              </Form.Group>
              <h3>Update your Account</h3>
              <Button variant='danger' type="submit">
                Update Account
              </Button>
              <h3>Delete your Account</h3>
              <Card.Body>
                <Button variant='danger' onClick={(e) => this.handleDeleteUser(e)}>
                  Delete Account
                </Button>
              </Card.Body>
            </Form>

          </Card.Body>
        </Card>
      </Row >
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string,
  }),
};