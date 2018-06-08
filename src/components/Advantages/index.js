import React, { Component } from 'react';
import proptypes from 'prop-types';

class Advantages extends Component {
  render() {
    const { oldAdvantages, className } = this.props;
    return (
      <div className={className}>
        {oldAdvantages.children.map(advantage => {
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
  oldAdvantages: proptypes.object,
  className: proptypes.string
};

export default Advantages;
