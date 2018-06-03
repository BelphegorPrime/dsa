import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  render() {
    const { spellList, className } = this.props;
    return (
      <div className={className}>
        <RecursiveComponent node={spellList} wrapper={'span'} />
      </div>
    );
  }
}

App.propTypes = {
  spellList: proptypes.object,
  className: proptypes.string
};

export default App;
