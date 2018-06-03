import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { spellList } = this.props;
    return (
      <div className="col-md-12">
        <RecursiveComponent node={spellList} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  spellList: proptypes.object
};

export default App;
