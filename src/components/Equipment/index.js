import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { equipment } = this.props;
    return (
      <div className="col-md-12">
        <RecursiveComponent node={equipment} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  equipment: proptypes.object
};

export default App;
