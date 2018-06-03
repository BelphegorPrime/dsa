import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { specialAbilities } = this.props;
    return (
      <div className="col-md-12">
        <RecursiveComponent node={specialAbilities} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  specialAbilities: proptypes.object
};

export default App;
