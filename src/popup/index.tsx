import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Popup extends React.Component {
  render() {
    return <div>this is popup!</div>;
  }
}

ReactDOM.render(<Popup />, document.getElementById('app'));
