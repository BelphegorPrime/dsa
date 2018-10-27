import React from 'react';
import proptypes from 'prop-types';
import { sortBy } from 'lodash';

const Purse = props => {
  const { hero, updateHero, className } = props;
  const { purse } = hero.converted;
  const updatePurse = (monetaryUnit, e) => {
    purse[monetaryUnit].amount = e.target.value;
    updateHero(hero);
  };

  if (!purse) {
    return null;
  }
  const sortedUnits = sortBy(Object.keys(purse), unit => purse[unit].position);
  return (
    <div className={className}>
      <div className="pl-2 pt-2">
        <span className="font-weight-bold">Vermögen</span>
        {sortedUnits.map(monetaryUnit => {
          const money = purse[monetaryUnit];
          return (
            <div key={monetaryUnit} className="mb-2">
              <span className="pl-2">
                <input
                  type="number"
                  className="mr-2"
                  style={{ width: 80 }}
                  value={money.amount > 0 ? money.amount : 0}
                  onChange={() => updatePurse(monetaryUnit)}
                />
                {monetaryUnit} ({money.country})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Purse.propTypes = {
  updateHero: proptypes.func,
  hero: proptypes.object,
  className: proptypes.string
};

export default Purse;
