import React, { Component } from 'react';
import proptypes from 'prop-types';

class App extends Component {
  render() {
    const { properties } = this.props;
    return (
      <div className="col-md-12">
        {properties.children.map(
          p =>
            p.attributes.startwert ? (
              <span key={p.attributes.name}>
                {`${p.attributes.name + p.attributes.startwert} (${
                  p.attributes.mod
                }) | ${p.attributes.value}`}
              </span>
            ) : (
              <span key={p.attributes.name}>
                {`${p.attributes.name + p.attributes.value}(${
                  p.attributes.mod
                })`}
              </span>
            )
        )}
      </div>
    );
  }
}

App.propTypes = {
  properties: proptypes.object
};

export default App;
