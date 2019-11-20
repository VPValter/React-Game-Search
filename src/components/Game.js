import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fetchJsonp from 'fetch-jsonp';

export class Game extends Component {
  state = {
    game: '',
    images: '',
    platforms: [],
    genres: [],
    publishers: [],
    devs: []
  };

  componentDidMount() {
    const gameId = this.props.match.params.id;
    console.log(gameId);

    fetchJsonp(
      'https://www.giantbomb.com/api/game/' +
      gameId +
      '/?api_key=ec164f3e4ebfe95b8f71fde3a5b2562480e35db4&format=jsonp',
      { jsonpCallback: 'json_callback' }
    )
      .then(res => res.json())
      .then(json => {
        console.log('parsed game', json);
        this.setState({
          game: json.results,
          images: json.results.image,
          platforms: json.results.platforms,
          genres: json.results.genres,
          publishers: json.results.publishers,
          devs: json.results.developers
        });
      })
      .catch(ex => console.log('parsing failed', ex));
  }

  render() {
    const platforms = this.state.platforms.map(plat => <span key={plat.id}>{plat.name}</span>);
    const genres = this.state.genres.map(genre => <span key={genre.id}>{genre.name}</span>);
    const devlist = this.state.devs.map(dev => <span key={dev.id}>{dev.name}</span>);
    const publist = this.state.publishers.map(pub => <span key={pub.id}>{pub.name}</span>);
    return (
      <div className='game-details' style={{ backgroundImage: `url(${this.state.images.original_url})` }}>
        <div className="game-details-inner">
          <img src={this.state.images.small_url} alt={this.state.game.name} />
          <div className="details-right">
            <Link to='/'>Go Back Home</Link>
            <h1>{this.state.game.name}</h1>
            <p>{this.state.game.deck}</p>
            <h5>Platforms:</h5>
            {platforms}<br></br>
            <h5>Genres:</h5>
            {genres}<br></br>
            <h5>Developers:</h5>
            {devlist}<br></br>
            <h5>Publishers:</h5>
            {publist}<br></br>
            <h5>Expected Release Year:</h5>
            {this.state.game.expected_release_year}<br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;