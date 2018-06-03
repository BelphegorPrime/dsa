import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { connections } = this.props;
    return (
      <div className="col-md-12">
        <RecursiveComponent node={connections} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  connections: proptypes.object
};

export default App;
