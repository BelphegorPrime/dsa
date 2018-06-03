import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { properties } = this.props;
    return (
      <div className="col-md-12">
        <RecursiveComponent node={properties} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  properties: proptypes.object
};

export default App;
