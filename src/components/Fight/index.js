import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { fight, className } = this.props;
    return (
      <div className={className}>
        <RecursiveComponent node={fight} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  fight: proptypes.object,
  className: proptypes.string
};

export default App;
