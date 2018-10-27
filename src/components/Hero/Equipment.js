import React from 'react';
import proptypes from 'prop-types';

const Equipment = props => {
  const { weapons, className } = props;
  const mappingFunc = name => {
    const weapon =
      weapons.closeRange[name] || weapons.farRange[name] || weapons.hunt[name];

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
        {Object.keys(weapons.closeRange).map(mappingFunc)}
        <hr />
        <span className="font-weight-bold">Fernkampfwaffen</span>
        {Object.keys(weapons.farRange).map(mappingFunc)}
        <hr />
        <span className="font-weight-bold">Jagdwaffen</span>
        {Object.keys(weapons.hunt).map(mappingFunc)}
      </div>
    </div>
  );
};

Equipment.propTypes = {
  weapons: proptypes.object,
  className: proptypes.string
};

export default Equipment;
