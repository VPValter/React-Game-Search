import React, { Component } from 'react';

class Pager extends Component {
  getPages() {
    let pages = this.props.totalRes / this.props.pageRes;
    pages = Math.ceil(pages);
    return pages;
  }

  spanArray = [];

  renderPager(count) {
    this.spanArray = [];
    for (let i = 0; i < count; i++) {
      this.spanArray.push('&page=' + (i + 1));
    }
  }

  render() {
    return (
      <div id='pager' className='pager'>
        {this.renderPager(this.getPages())}
        {this.spanArray.map((page, i) => (
          <span
            onClick={() => {
              this.props.search(this.props.query, page);
            }}
            key={i}
          >
            {i + 1}
          </span>
        ))}
      </div>
    );
  }
}

export default Pager;
