import React, { Component } from 'react';
import proptypes from 'prop-types';

class Connections extends Component {
  render() {
    const { oldConnections, className } = this.props;
    return (
      <div className={className}>
        {oldConnections.children.map(connection => {
          const { beschreibung, name, so } = connection.attributes;
          return (
            <div key={name} className="col-md-12 pt-2">
              <span>
                {name || null} {beschreibung || null} {so || null}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

Connections.propTypes = {
  oldConnections: proptypes.object,
  className: proptypes.string
};

export default Connections;
