import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import Search from './components/Search';
import Games from './components/Games';
import Game from './components/Game';
import Pager from './components/Pager';

class App extends Component {
  state = {
    games: [],
    pageRes: 0,
    totalRes: 0,
    query: '',
    error: ''
  };

  // Search:
  search = (query, pageString) => {
    this.setState({ query: query });
    fetchJsonp(
      'https://www.giantbomb.com/api/search/?api_key=ec164f3e4ebfe95b8f71fde3a5b2562480e35db4&query=' +
        query +
        '&resources=game&format=jsonp&limit=12' +
        pageString,
      { jsonpCallback: 'json_callback' }
    )
      .then(res => res.json())
      .then(json => {
        console.log('parsed json', json);
        this.setState({
          games: json.results,
          pageRes: json.limit,
          totalRes: json.number_of_total_results
        });
      })
      .catch(ex => {
        console.log('parsing failed', ex);
        this.setState({
          error:
            'Request error occured. The request limit may have been reached. Try again in 15 minutes or more.'
        });
      });
  };

  render() {
    return (
      <Router>
        <div className='App'>
          <Route
            exact
            path='/'
            render={props => (
              <React.Fragment>
                <div className='app-name'>
                  <h1>Game Search App</h1>
                  <small>0.1.0</small>
                </div>
                <div className='links'>
                  {/* <Link to="/about">About</Link> */}
                </div>
                <Search search={this.search} />
                <Games games={this.state.games} />
                <Pager
                  pageRes={this.state.pageRes}
                  totalRes={this.state.totalRes}
                  query={this.state.query}
                  search={this.search}
                />
                {this.state.error ? <span>{this.state.error}</span> : null}
              </React.Fragment>
            )}
          />
          <Route path='/game/:id' component={Game} />
        </div>
      </Router>
    );
  }
}

export default App;
