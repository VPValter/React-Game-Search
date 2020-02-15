import React, { Component } from 'react';
import GameListItem from './GameListItem';
import PropTypes from 'prop-types';

class Games extends Component {
  render() {
    return (
      <div className='game-list'>
        {this.props.games.map(game => (
          <GameListItem key={game.id} game={game} />
        ))}
      </div>
    );
  }
}

// PropTypes
Games.propTypes = {
  games: PropTypes.array.isRequired
};

export default Games;