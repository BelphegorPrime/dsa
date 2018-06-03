import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { equipment, className } = this.props;
    return (
      <div className={className}>
        <RecursiveComponent node={equipment} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  equipment: proptypes.object,
  className: proptypes.string
};

export default App;
