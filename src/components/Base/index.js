import React, { Component } from 'react';
import proptypes from 'prop-types';

class App extends Component {
  render() {
    const { name, base } = this.props
    return (
      <div className="col-md-12">
        <span>{name}</span>
        <span>{base.children[0].attributes.name}</span>
        <span>{base.children[2].attributes.string}</span>
        <span>{base.children[3].attributes.string}</span>
        <span>{base.children[4].children[0].attributes.string}</span>
        <span>{base.children[6].attributes.notiz0.split('&#10;')}</span>
        <span>{base.children[8].attributes.value} AP</span>
        <span>{base.children[9].attributes.value} AP</span>
      </div>
    );
  }
}

App.propTypes = {
  base: proptypes.object,
  name: proptypes.string
};

export default App;
