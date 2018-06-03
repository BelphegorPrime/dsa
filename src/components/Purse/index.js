import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { purse } = this.props;
    return (
      <div className="col-md-12">
        <RecursiveComponent node={purse} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  purse: proptypes.object
};

export default App;
