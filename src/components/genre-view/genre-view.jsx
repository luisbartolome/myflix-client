import React from 'react';
import { Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Card bg="dark" className="justify-content-md-center" className="director-view">
                <Card.Body>

                    <Card.Title>{genre.Name}</Card.Title>
                    <Card.Text>{genre.Description}</Card.Text>
  
                </Card.Body>
                <Card.Text>
            <Link to={`/`}>
              <Button variant="secondary">Main View</Button>
            </Link>
          </Card.Text>

          <Card.Text>
            <Button variant="primary" onClick={() => onBackClick(null)}>
              Back
            </Button>
          </Card.Text>
          </Card>
    );
  }
}

GenreView.propTypes = {
  girector: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
  onBackClick: PropTypes.func.isRequired,
}; 