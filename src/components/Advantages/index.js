import React, { Component } from 'react';
import proptypes from 'prop-types';

class Advantages extends Component {
  render() {
    const { advantages, className } = this.props;
    return (
      <div className={className}>
        {advantages.children.map(advantage => {
          const { name, value } = advantage.attributes;
          return (
            <div key={name} className="col-md-12 pt-2">
              <span>
                {name} {value || null}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

Advantages.propTypes = {
  advantages: proptypes.object,
  className: proptypes.string
};

export default Advantages;
