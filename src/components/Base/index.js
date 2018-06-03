import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { name, base, className } = this.props;
    return (
      <div className={className}>
        <span>{name}</span>
        <RecursiveComponent node={base} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  base: proptypes.object,
  name: proptypes.string,
  className: proptypes.string
};

export default App;
