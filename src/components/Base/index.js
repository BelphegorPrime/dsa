import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { name, base } = this.props;
    return (
      <div className="col-md-12">
        <span>{name}</span>
        <RecursiveComponent node={base} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  base: proptypes.object,
  name: proptypes.string
};

export default App;
