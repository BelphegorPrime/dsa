import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { objects } = this.props;
    return (
      <div className="col-md-12">
        <RecursiveComponent node={objects} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  objects: proptypes.object
};

export default App;
