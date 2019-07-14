import { object, string } from "prop-types";
import React from "react";
import { Equipment as EquipmentType } from "../../types";

interface EquipmentProps {
  weapons: EquipmentType | undefined;
  className: string;
}

const Equipment = (props: EquipmentProps) => {
  const { weapons, className } = props;
  if (!weapons) {
    return null;
  }
  const mappingFunc = (name: string) => {
    const closeRange = weapons.closeRange && weapons.closeRange[name];
    const farRange = weapons.farRange && weapons.farRange[name];
    const hunt = weapons.hunt && weapons.hunt[name];
    const weapon = closeRange || farRange || hunt;

    if (!weapon) {
      return null;
    }

    return (
      <div key={weapon.weaponName ? weapon.weaponName : name} className="pl-2">
        <span className="font-weight-bold">
          {weapon.weaponName ? weapon.weaponName : name}
        </span>
        {closeRange && closeRange.hand ? ` (${closeRange.hand})` : null}
        {hunt && hunt.hand ? ` (${hunt.hand})` : null}
        {closeRange && closeRange.minBreakFactor
          ? ` minBF:${closeRange.minBreakFactor}`
          : null}
        {hunt && hunt.minBreakFactor ? ` minBF:${hunt.minBreakFactor}` : null}
        {closeRange && closeRange.breakFactor
          ? ` BF:${closeRange.breakFactor}`
          : null}
        {hunt && hunt.breakFactor ? ` BF:${hunt.breakFactor}` : null}
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
