import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    return (
      <Card bg="dark" fluid className="DirectorView">
        <div className="director-view">
          <div className="director-name">
            <span className="label font-weight-bold">Director: </span>
            <span className="value">{director.Name}</span>
          </div>
          <div className="director-bio">
            <span className="label font-weight-bold">Bio: </span>
            <span className="value">{director.Bio}</span>
          </div>
          <div className="director-birth">
            <span className="label font-weight-bold">Born: </span>
            <span className="value">{director.Birth}</span>
          </div>
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
        </div>
      </Card>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }),
  onBackClick: PropTypes.func.isRequired,
};