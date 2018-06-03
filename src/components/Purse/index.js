import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { purse, className } = this.props;
    return (
      <div className={className}>
        <RecursiveComponent node={purse} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  purse: proptypes.object,
  className: proptypes.string
};

export default App;
