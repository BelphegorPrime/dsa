import { calc2, calc5 } from "../helperFunctions";
import { RawProperty } from "../rawTypes";
import { Property } from "../types";

export default (properties: RawProperty[]): Property => {
  const returnProperties: Property = {};
  properties.forEach((pp: RawProperty) => {
    const {
      mod,
      startwert: startValue,
      value,
      grossemeditation,
      mrmod
    } = pp.attributes;
    let name = "";
    switch (pp.attributes.name) {
      case "Mut":
        name = "courage";
        break;
      case "Klugheit":
        name = "wisdom";
        break;
      case "Intuition":
        name = "intuition";
        break;
      case "Charisma":
        name = "charisma";
        break;
      case "Fingerfertigkeit":
        name = "fingerAbility";
        break;
      case "Gewandtheit":
        name = "dexterity";
        break;
      case "Konstitution":
        name = "constitution";
        break;
      case "Körperkraft":
        name = "strength";
        break;
      case "Sozialstatus":
        name = "socialStatus";
        break;
      case "Lebensenergie":
        name = "lifeforce";
        break;
      case "Ausdauer":
        name = "endurance";
        break;
      case "Astralenergie":
        name = "astralEnergy";
        break;
      case "Karmaenergie":
        name = "karmaEnergy";
        break;
      case "Magieresistenz":
        name = "magicResistance";
        break;
      case "ini":
        name = "initiativBaseValue";
        break;
      case "at":
        name = "attackBaseValue";
        break;
      case "pa":
        name = "paradeBaseValue";
        break;
      case "fk":
        name = "remoteCombatBaseValue";
        break;
      case "Gefahrenwert":
        name = "risk";
        break;
      case "Loyalität":
        name = "loyalty";
        break;
      case "Geschwindigkeit":
        name = "speed";
        break;
      case "Magieresistenz 2":
        name = "magicResistance2";
        break;
      case "Rüstungsschutz":
        name = "armor";
        break;
      default: {
        const n = pp.attributes.name;
        name = `${n}`;
      }
    }
    if (name === "astralEnergy") {
      returnProperties[name] = {
        mod: parseInt(mod, 10),
        value: parseInt(value, 10),
        basicValue: parseInt(value, 10),
        greatMeditation: parseInt(grossemeditation, 10),
        magicResistenceMod: parseInt(mrmod, 10)
      };
    } else if (startValue) {
      returnProperties[name] = {
        mod: parseInt(mod, 10),
        startValue: parseInt(startValue, 10),
        basicValue: parseInt(value, 10),
        value: parseInt(value, 10)
      };
    } else {
      returnProperties[name] = {
        mod: parseInt(mod, 10),
        basicValue: parseInt(value, 10),
        value: parseInt(value, 10)
      };
    }
  });

  if (
    returnProperties.constitution &&
    returnProperties.strength &&
    returnProperties.lifeforce
  ) {
    returnProperties.lifeforce.calcValue = calc2(
      returnProperties.constitution.value,
      returnProperties.constitution.value,
      returnProperties.strength.value
    );
  }

  if (returnProperties.lifeforce && returnProperties.lifeforce.calcValue) {
    returnProperties.lifeforce.value =
      returnProperties.lifeforce.calcValue +
      returnProperties.lifeforce.mod +
      returnProperties.lifeforce.basicValue;
  }
  if (
    returnProperties.endurance &&
    returnProperties.courage &&
    returnProperties.constitution &&
    returnProperties.dexterity
  ) {
    returnProperties.endurance.calcValue = calc2(
      returnProperties.courage.value,
      returnProperties.constitution.value,
      returnProperties.dexterity.value
    );
    returnProperties.endurance.value =
      returnProperties.endurance.calcValue +
      returnProperties.endurance.mod +
      returnProperties.endurance.basicValue;
  }

  if (
    returnProperties.astralEnergy &&
    returnProperties.courage &&
    returnProperties.intuition &&
    returnProperties.charisma &&
    returnProperties.astralEnergy.greatMeditation
  ) {
    returnProperties.astralEnergy.calcValue = calc2(
      returnProperties.courage.value,
      returnProperties.intuition.value,
      returnProperties.charisma.value
    );
    returnProperties.astralEnergy.value =
      returnProperties.astralEnergy.calcValue +
      returnProperties.astralEnergy.mod +
      returnProperties.astralEnergy.basicValue +
      returnProperties.astralEnergy.greatMeditation;
  }

  if (
    returnProperties.initiativBaseValue &&
    returnProperties.courage &&
    returnProperties.intuition &&
    returnProperties.dexterity
  ) {
    returnProperties.initiativBaseValue.calcValue = calc5(
      returnProperties.courage.value,
      returnProperties.courage.value,
      returnProperties.intuition.value,
      returnProperties.dexterity.value
    );
    returnProperties.initiativBaseValue.value =
      returnProperties.initiativBaseValue.calcValue +
      returnProperties.initiativBaseValue.mod;
  }

  if (
    returnProperties.attackBaseValue &&
    returnProperties.courage &&
    returnProperties.dexterity &&
    returnProperties.strength
  ) {
    returnProperties.attackBaseValue.calcValue = calc5(
      returnProperties.courage.value,
      returnProperties.dexterity.value,
      returnProperties.strength.value
    );
    returnProperties.attackBaseValue.value =
      returnProperties.attackBaseValue.calcValue +
      returnProperties.attackBaseValue.mod;
  }

  if (
    returnProperties.paradeBaseValue &&
    returnProperties.intuition &&
    returnProperties.dexterity &&
    returnProperties.strength
  ) {
    returnProperties.paradeBaseValue.calcValue = calc5(
      returnProperties.intuition.value,
      returnProperties.dexterity.value,
      returnProperties.strength.value
    );
    returnProperties.paradeBaseValue.value =
      returnProperties.paradeBaseValue.calcValue +
      returnProperties.paradeBaseValue.mod;
  }

  if (
    returnProperties.remoteCombatBaseValue &&
    returnProperties.intuition &&
    returnProperties.fingerAbility &&
    returnProperties.strength
  ) {
    returnProperties.remoteCombatBaseValue.calcValue = calc5(
      returnProperties.intuition.value,
      returnProperties.fingerAbility.value,
      returnProperties.strength.value
    );
    returnProperties.remoteCombatBaseValue.value =
      returnProperties.remoteCombatBaseValue.calcValue +
      returnProperties.remoteCombatBaseValue.mod;
  }

  if (returnProperties.karmaEnergy) {
    returnProperties.karmaEnergy.calcValue = 0;
  }

  if (returnProperties.magicResistance) {
    returnProperties.magicResistance.calcValue = calc5(
      returnProperties.courage ? returnProperties.courage.value : 0,
      returnProperties.wisdom ? returnProperties.wisdom.value : 0,
      returnProperties.constitution ? returnProperties.constitution.value : 0
    );
    returnProperties.magicResistance.value =
      returnProperties.magicResistance.calcValue +
      returnProperties.magicResistance.mod +
      returnProperties.magicResistance.basicValue;
  }
  return returnProperties;
};
