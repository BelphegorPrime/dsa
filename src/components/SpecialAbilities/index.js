import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { specialAbilities, className } = this.props;
    return (
      <div className={className}>
        <RecursiveComponent node={specialAbilities} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  specialAbilities: proptypes.object,
  className: proptypes.string
};

export default App;
