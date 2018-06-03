import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div className="col-md-12">
        <RecursiveComponent node={comments} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  comments: proptypes.object
};

export default App;
