import React, { Component } from 'react';
import proptypes from 'prop-types';
import { sortBy } from 'lodash';

class Purse extends Component {
  updatePurse(monetaryUnit, e) {
    const { hero, updateHero } = this.props;
    hero.converted.purse[monetaryUnit].amount = e.target.value;
    updateHero(hero);
  }

  render() {
    const { hero, className } = this.props;
    const { purse } = hero.converted;
    if (!purse) {
      return null;
    }
    const sortedUnits = sortBy(
      Object.keys(purse),
      unit => purse[unit].position
    );
    return (
      <div className={className}>
        <div className="pl-2 pt-2">
          <span className="font-weight-bold">Vermögen</span>
          {sortedUnits.map(monetaryUnit => {
            const money = purse[monetaryUnit];
            return (
              <div key={monetaryUnit}>
                <span className="pl-2">
                  <input
                    type="number"
                    className="mr-2"
                    style={{ width: 80 }}
                    value={money.amount > 0 ? money.amount : 0}
                    onChange={this.updatePurse.bind(this, monetaryUnit)}
                  />
                  {monetaryUnit} ({money.country})
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
  updateHero: proptypes.func,
  hero: proptypes.object,
  className: proptypes.string
};

export default Purse;
