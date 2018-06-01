import React, { Component } from 'react';
import proptypes from 'prop-types';

class App extends Component {
  render() {
    const { hero } = this.props;
    if (hero) {
      return <div>{hero.children[0].attributes.name}</div>;
    }
    return null;
  }
}

App.propTypes = {
  hero: proptypes.object
};

export default App;
