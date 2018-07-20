import React, { Component } from 'react';
import proptypes from 'prop-types';

class Purse extends Component {
  render() {
    const { purse, className } = this.props;
    if (!purse) {
      return null;
    }
    return (
      <div className={className}>
        <div className="pl-2 pt-2">
          <span className="font-weight-bold">Vermögen</span>
          {Object.keys(purse).map(monetaryUnit => {
            const money = purse[monetaryUnit];
            return (
              <div key={monetaryUnit}>
                <span className="pl-2">
                  {money.amount} {monetaryUnit} ({money.country})
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Purse.propTypes = {
  purse: proptypes.object,
  className: proptypes.string
};

export default Purse;
