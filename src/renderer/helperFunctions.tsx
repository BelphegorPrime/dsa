import { v4 as uuid4 } from "uuid";
import trialToProperty from "./heroConverter/trialToProperty";
import { Electron, MainProperties, Property } from "./types/types";

export const rollDice = (x: number): number =>
  Math.floor(Math.random() * x) + 1;

export const test = (
  trial: string[],
  properties: Property
): { values: string; diceThrow: number } => {
  const propertyValues = trial
    .map(trialToProperty)
    .map((property: string | null) => {
      if (property) {
        const possibleProperty = properties[property];
        if (possibleProperty && possibleProperty.value) {
          return possibleProperty.value;
        }
        return 0;
      }
      return 0;
    });
  console.warn(`Eigenschaften: ${propertyValues}`);
  const throws = propertyValues.map(() => rollDice(20));
  console.warn(`Gewürfelte Werte: ${throws}`);
  const propertyValue = propertyValues.map((val, i) => val - throws[i]);
  console.warn(`Ergebnisse: ${propertyValue}`);
  return {
    values: `(${propertyValue.join("/")})`,
    diceThrow: propertyValue
      .filter((val) => val < 0)
      .reduce((acc, val) => acc + val, 0),
  };
};

// tslint:disable-next-line:no-empty
export const noop = (): void => {};

export const addId = (thing: any): any => {
  const returnThing = thing;
  returnThing.id = uuid4();
  return returnThing;
};

export const calc2 = (
  x: number | string,
  y: number | string,
  z: number | string
): number => {
  const xValue = typeof x === "string" ? parseInt(x, 10) : x;
  const yValue = typeof y === "string" ? parseInt(y, 10) : y;
  const zValue = typeof z === "string" ? parseInt(z, 10) : z;
  return Math.round((xValue + yValue + zValue) / 2);
};

export const calc5 = (
  x: number | string,
  y: number | string,
  z: number | string,
  a: number | string = 0
): number => {
  const xValue = typeof x === "string" ? parseInt(x, 10) : x;
  const yValue = typeof y === "string" ? parseInt(y, 10) : y;
  const zValue = typeof z === "string" ? parseInt(z, 10) : z;
  const aValue = typeof a === "string" ? parseInt(a, 10) : a;
  return Math.round((xValue + yValue + zValue + aValue) / 5);
};

export const calcKe = (
  x: number | string,
  y: number | string,
  z: number | string
): number => {
  console.warn(x, y, z);
  return 0;
};

declare global {
  interface Window {
    require: any;
  }
}

export const getElectron = (): Electron | null => {
  if (window && window.require) {
    const instance = window.require("electron");
    const { ipcRenderer } = instance;
    return {
      instance,
      ipcRenderer,
    };
  }
  return null;
};

export const isJSON = (jsonString: string): any | null => {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const objectWithoutKey = (theObject: any, key: string): any => {
  const { [key]: deletedValue, ...otherKeys } = theObject;
  return otherKeys;
};

export const countBy = (data: any): { [key: string]: number } => {
  const t: { [key: string]: number } = {};
  data.forEach((val: string) => {
    if (t[val]) {
      t[val] += 1;
    } else {
      t[val] = 1;
    }
  });
  return t;
};

export const getMainProperties = (): MainProperties => ({
  MU: "courage",
  KL: "wisdom",
  IN: "intuition",
  CH: "charisma",
  FF: "fingerAbility",
  GE: "dexterity",
  KO: "constitution",
  KK: "strength",
});
