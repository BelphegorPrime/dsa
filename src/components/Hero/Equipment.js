import React from 'react';
import { object, string } from 'prop-types';

const Equipment = props => {
  const { weapons, className } = props;
  const mappingFunc = name => {
    const weapon =
      (weapons.closeRange && weapons.closeRange[name]) ||
      (weapons.farRange && weapons.farRange[name]) ||
      (weapons.hunt && weapons.hunt[name]);

    return (
      <div key={weapon.weaponName ? weapon.weaponName : name} className="pl-2">
        <span className="font-weight-bold">
          {weapon.weaponName ? weapon.weaponName : name}
        </span>
        {weapon.hand ? ` (${weapon.hand})` : null}
        {weapon.minBreakFactor ? ` minBF:${weapon.minBreakFactor}` : null}
        {weapon.breakFactor ? ` BF:${weapon.breakFactor}` : null}
      </div>
    );
  };

  return (
    <div className={className}>
      <div className="pl-2 pt-2">
        <span className="font-weight-bold">Nahkampfwaffen</span>
        {weapons.closeRange
          ? Object.keys(weapons.closeRange).map(mappingFunc)
          : null}
        <hr />
        <span className="font-weight-bold">Fernkampfwaffen</span>
        {weapons.farRange
          ? Object.keys(weapons.farRange).map(mappingFunc)
          : null}
        <hr />
        <span className="font-weight-bold">Jagdwaffen</span>
        {weapons.hunt ? Object.keys(weapons.hunt).map(mappingFunc) : null}
      </div>
    </div>
  );
};

Equipment.propTypes = {
  weapons: object,
  className: string
};

export default Equipment;
