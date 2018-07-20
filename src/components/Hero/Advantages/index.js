import React, { Component } from 'react';
import proptypes from 'prop-types';

class Advantages extends Component {
  render() {
    const { advantages, className } = this.props;
    return (
      <div className={className}>
        <div className="pl-2 pt-2">
          <span className="font-weight-bold">Vorteile:</span>
          {advantages.map(advantage => {
            const { name, value } = advantage;
            return (
              <div key={name} className="col-md-12 pt-2">
                <span>
                  {name} {value || null}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Advantages.propTypes = {
  advantages: proptypes.array,
  className: proptypes.string
};

export default Advantages;
