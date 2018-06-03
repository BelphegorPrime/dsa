import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { properties, className } = this.props;
    return (
      <div className={className}>
        <RecursiveComponent node={properties} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  properties: proptypes.object,
  className: proptypes.string
};

export default App;
