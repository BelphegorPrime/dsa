import uuid4 from 'uuid4';
import trialToProperty from './heroConverter/trialToProperty';

export const rollDice = x => Math.floor(Math.random() * x) + 1;

export const test = (trial, properties) => {
  const propertyValues = trial.map(trialToProperty).map(property => {
    const possibleProperty = properties[property];
    if (possibleProperty && possibleProperty.value) {
      return possibleProperty.value;
    }
    return 0;
  });
  console.warn(`Eigenschaften: ${propertyValues}`);
  const throws = propertyValues.map(() => rollDice(20));
  console.warn(`Gewürfelte Werte: ${throws}`);
  const propertyValue = propertyValues.map((val, i) => val - throws[i]);
  console.warn(`Ergebnisse: ${propertyValue}`);
  return {
    values: `(${propertyValue.join('/')})`,
    diceThrow: propertyValue
      .filter(val => val < 0)
      .reduce((acc, val) => acc + val, 0)
  };
};

export const noop = () => {};

export const addId = thing => {
  const returnThing = thing;
  returnThing.id = uuid4();
  return returnThing;
};

export const calc2 = (x, y, z) =>
  Math.round((parseInt(x, 10) + parseInt(y, 10) + parseInt(z, 10)) / 2);

export const calc5 = (x, y, z, a = '0') =>
  Math.round(
    (parseInt(x, 10) + parseInt(y, 10) + parseInt(z, 10) + parseInt(a, 10)) / 5
  );

export const calcKe = (x, y, z) => {
  console.warn(x, y, z);
  return 0;
};

export const getElectron = () => {
  // eslint-disable-next-line no-undef
  if (window.require) {
    // eslint-disable-next-line no-undef
    const instance = window.require('electron');
    const { remote, ipcRenderer } = instance;
    const fs = remote.require('fs');
    const tempDirectory = remote.require('os').tmpdir();
    return {
      instance,
      fs,
      ipcRenderer,
      tempDirectory
    };
  }
  return null;
};

export const isJSON = string => {
  try {
    return JSON.parse(string);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const objectWithoutKey = (object, key) => {
  const { [key]: deletedKey, ...otherKeys } = object;
  return otherKeys;
};

export const countBy = data => {
  const t = {};
  data.forEach(val => {
    if (t[val]) {
      t[val] += 1;
    } else {
      t[val] = 1;
    }
  });
  return t;
};

export const getMainProperties = () => ({
  MU: 'courage',
  KL: 'wisdom',
  IN: 'intuition',
  CH: 'charisma',
  FF: 'fingerAbility',
  GE: 'dexterity',
  KO: 'constitution',
  KK: 'strength'
});
