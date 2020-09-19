import React, { ChangeEvent } from "react";
import { Hero } from "../../types";

interface PurseProps {
  updateHero: (hero: Hero) => void;
  hero: Hero;
  className: string;
}

const Purse = (props: PurseProps) => {
  const { hero, updateHero, className } = props;
  const { purse } = hero.converted;
  const updatePurse = (
    monetaryUnit: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (purse) {
      purse[monetaryUnit].amount = parseInt(e.target.value, 10);
      updateHero(hero);
    }
  };

  if (!purse) {
    return null;
  }

  const sortedUnits = Object.keys(purse).sort((a, b) => {
    const p1 = purse[a];
    const p2 = purse[b];
    if (p1.position < p2.position) {
      return -1;
    }
    if (p1.position > p2.position) {
      return 1;
    }
    return 0;
  });

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
                  onChange={e => updatePurse(monetaryUnit, e)}
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

export default Purse;
