import { RawEquipemnt } from "../types/rawTypes";
import { Equipment } from "../types/types";

export default (equipments: RawEquipemnt[]): Equipment => {
  const returnEquipment: Equipment = {};
  equipments.forEach((equi) => {
    const {
      name,
      bezeichner: identifier,
      bfakt: breakFactor,
      bfmin: minBreakFactor,
      hand,
      schild: shield,
      set,
      slot,
      talent,
      waffenname: weaponName,
      nummer: equiNumber,
    } = equi.attributes;
    if (name.indexOf("nk") > -1) {
      if (!returnEquipment.closeRange) {
        returnEquipment.closeRange = {};
      }
      returnEquipment.closeRange[name] = {
        name,
        identifier,
        breakFactor,
        minBreakFactor,
        hand,
        shield,
        set,
        slot,
        talent,
        weaponName,
      };
    } else if (name.indexOf("fk") > -1) {
      if (!returnEquipment.farRange) {
        returnEquipment.farRange = {};
      }
      returnEquipment.farRange[name] = {
        name,
        set,
        slot,
        talent,
        weaponName,
      };
    } else if (name.indexOf("jagt") > -1) {
      if (!returnEquipment.hunt) {
        returnEquipment.hunt = {};
      }
      returnEquipment.hunt[name] = {
        name,
        identifier,
        breakFactor,
        minBreakFactor,
        hand,
        shield,
        set,
        slot,
        talent,
        weaponName,
        equiNumber,
      };
    }
  });
  return returnEquipment;
};
