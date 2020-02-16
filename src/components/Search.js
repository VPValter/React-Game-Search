import React, { Component } from 'react';

class Search extends Component {
  state = {
    query: ''
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.search(this.state.query);
  };

  immaTyping = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} className='search-form'>
        <input
          type='text'
          name='query'
          placeholder='Search for a game title...'
          value={this.state.query}
          onChange={this.immaTyping}
        />
        <input type='submit' value='Search' className='search-btn' />
      </form>
    );
  }
}

export default Search;
