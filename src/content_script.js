import React, { Component } from 'react';
import { render } from 'react-dom';

class Inject extends Component {
  render() {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: 50,
          left: 50,
          background: '#FFF',
          height: 40,
          'z-index': 1000,
        }}
      >
        this is inject scripts!
      </div>
    );
  }
}

window.addEventListener('load', () => {
  const dom = document.createElement('div');
  dom.id = 'github-plus';
  document.querySelector('body').appendChild(dom);

  render(<Inject />, dom);
});
