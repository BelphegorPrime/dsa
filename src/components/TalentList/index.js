import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { talentList } = this.props;
    return (
      <div className="col-md-12">
        <RecursiveComponent node={talentList} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  talentList: proptypes.object
};

export default App;
