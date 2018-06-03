import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { connections, className } = this.props;
    return (
      <div className={className}>
        <RecursiveComponent node={connections} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  connections: proptypes.object,
  className: proptypes.string
};

export default App;
