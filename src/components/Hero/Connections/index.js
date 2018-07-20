import React, { Component } from 'react';
import proptypes from 'prop-types';

class Connections extends Component {
  render() {
    const { connections, className } = this.props;
    return (
      <div className={className}>
        <div className="pl-2 pt-2">
          <span className="font-weight-bold">Verbindungen:</span>
          {connections.map(connection => {
            const { description, name, socialStatus } = connection;
            return (
              <div key={name} className="col-md-12 pt-2">
                <span>
                  {name || null} {description || null} {socialStatus || null}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Connections.propTypes = {
  connections: proptypes.array,
  className: proptypes.string
};

export default Connections;
