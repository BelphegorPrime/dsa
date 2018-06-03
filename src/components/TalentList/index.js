import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { talentList, className } = this.props;
    return (
      <div className={className}>
        <RecursiveComponent node={talentList} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  talentList: proptypes.object,
  className: proptypes.string
};

export default App;
