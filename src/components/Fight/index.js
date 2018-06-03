import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { fight } = this.props;
    return (
      <div className="col-md-12">
        <RecursiveComponent node={fight} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  fight: proptypes.object
};

export default App;
