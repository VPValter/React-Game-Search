import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Search from './components/Search';
import Games from './components/Games';
import Game from './components/Game';

class App extends Component {
  state = {
    games: []
  };

  // Search:
  search = query => {
    fetchJsonp(
      'https://www.giantbomb.com/api/search/?api_key=ec164f3e4ebfe95b8f71fde3a5b2562480e35db4&query=' +
        query + '&resources=game&format=jsonp&limit=12',
      { jsonpCallback: 'json_callback' }
    )
      .then(res => res.json())
      .then(json => {
        console.log('parsed json', json);
        this.setState({ games: json.results });
      })
      .catch(ex => console.log('parsing failed', ex));
  };

  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path="/" render={props => (
            <React.Fragment>
              <div className="app-name">
                <h1>Game Search App</h1>
                <small>0.0.4</small>
              </div>
              <div className="links">
                {/* <Link to="/about">About</Link> */}
              </div>
              <Search search={this.search} />
              <Games games={this.state.games} />
            </React.Fragment>
          )} />
          <Route path="/game/:id" component={Game} />
        </div>
      </Router>
    );
  }
}

export default App;
