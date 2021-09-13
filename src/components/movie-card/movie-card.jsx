import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';

//Components & Styling
import Button from 'react-bootstrap/Button';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    
    
    return (
        <Card>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Button onClick={() => onMovieClick(movie)} variant="link">View more</Button>
          </Card.Body>
        </Card>
      );
    }
  } 

// PropTypes
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
    }),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MovieCard;