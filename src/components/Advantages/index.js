import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { advantages, className } = this.props;
    return (
      <div className={className}>
        <RecursiveComponent node={advantages} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  advantages: proptypes.object,
  className: proptypes.string
};

export default App;
