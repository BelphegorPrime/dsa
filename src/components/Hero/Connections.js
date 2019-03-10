import React from 'react';
import { array, string } from 'prop-types';

const Connections = props => {
  const { connections, className } = props;
  return (
    <div className={className}>
      <div className="pl-2">
        <span className="font-weight-bold">Verbindungen:</span>
        {connections.map(connection => {
          const { description, name, socialStatus } = connection;
          return (
            <div key={name} className="col-12 pt-2">
              <span>
                {name || null} {description || null} {socialStatus || null}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Connections.propTypes = {
  connections: array,
  className: string
};

export default Connections;
