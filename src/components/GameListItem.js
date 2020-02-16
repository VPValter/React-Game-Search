import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import noImage from '../no_image.jpg';

class GameListItem extends Component {
  render() {
    return (
      <div className='game-list-item'>
        <Link to={`/game/${this.props.game.id}`}>
          <img
            src={ this.props.game.image.small_url }
            alt=''
          />
          <h3>{this.props.game.name}</h3>
        </Link>
      </div>
    );
  }
}

// PropTypes
GameListItem.propTypes = {
  game: PropTypes.object.isRequired
};

export default GameListItem;
