// @ts-ignore
// tslint:disable-next-line:no-implicit-dependencies
import * as Node from "node";

export interface Basic {
  gender?: string;
  playAids?: string[];
  race?: string;
  size?: number;
  mass?: number;
  age?: number;
  eyeColor?: string;
  hairColor?: string;
  calendar?: string;
  birthDate?: string;
  startGeneratingPoints?: number;
  culture?: string;
  profession?: {
    kind?: string;
    name?: string;
    coverIdentity?: string;
    variant?: string;
  };
  notes?: string[];
  exp?: number;
  freeExp?: number;
}

export interface Child {
  name: string;
  attributes: ChildAttributes;
  parent: null;
  type: string;
  value?: string;
  children: Child[];
}

interface ChildAttributes {
  id?: string;
  key?: string;
  name?: string;
  value?: string;
  notiz0?: string;
  kommentar?: string;
  added?: boolean;
  anzahl?: number;
  slot?: string;
  string?: string;
  gewicht?: string;
  alter?: string;
  augenfarbe?: string;
  haarfarbe?: string;
  kalender?: string;
  gpstart?: string;
  gbtag?: string;
  gbmonat?: string;
  gbjahr?: string;
  art?: string;
  tarnidentitaet?: string;
  kampftalent?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface Electron {
  fs: Node.fs;
  tempDirectory: string;
}

export interface Equipment {
  hunt?: {
    [name: string]: {
      name: string;
      identifier: string;
      breakFactor: number;
      minBreakFactor: number;
      hand: string;
      shield: string;
      set: string;
      slot: string;
      talent: string;
      weaponName: string;
      equiNumber: number;
    };
  };
  farRange?: {
    [name: string]: {
      name: string;
      set: string;
      slot: string;
      talent: string;
      weaponName: string;
    };
  };
  closeRange?: {
    [name: string]: {
      name: string;
      identifier: string;
      breakFactor: number;
      minBreakFactor: number;
      hand: string;
      shield: string;
      set: string;
      slot: string;
      talent: string;
      weaponName: string;
    };
  };
}

export interface Event extends ChildAttributes {
  Alt: string;
  Neu: string;
  kommentar: string;
  obj: string;
  text: string;
  time: string;
  version: string;
  name?: string;
}

export interface HouseRule {
  type: string;
  page: number;
  name: string;
  additionalModification: Array<{ name: string }>;
}

export interface Liturgie {
  name: string;
}

export interface ObjectType {
  [name: string]: {
    slot: number;
    amount: number;
    distantWeapon?: boolean;
    talent?: string;
    weight?: number;
    price?: number;
    name?: string;
    properties?: Property;
  };
}

export interface Property {
  courage?: PropertyValue;
  wisdom?: PropertyValue;
  intuition?: PropertyValue;
  charisma?: PropertyValue;
  fingerAbility?: PropertyValue;
  dexterity?: PropertyValue;
  constitution?: PropertyValue;
  strength?: PropertyValue;
  socialStatus?: PropertyValue;
  lifeforce?: PropertyValue;
  endurance?: PropertyValue;
  astralEnergy?: PropertyValue;
  karmaEnergy?: PropertyValue;
  magicResistance?: PropertyValue;
  initiativBaseValue?: PropertyValue;
  attackBaseValue?: PropertyValue;
  paradeBaseValue?: PropertyValue;
  remoteCombatBaseValue?: PropertyValue;
  risk?: PropertyValue;
  loyalty?: PropertyValue;
  speed?: PropertyValue;
  magicResistance2?: PropertyValue;
  armor?: PropertyValue;
  [key: string]: PropertyValue | undefined;
}

interface PropertyValue {
  mod: number;
  value: number;
  basicValue: number;
  greatMeditation?: number;
  magicResistenceMod?: number;
  startValue?: number;
  calcValue?: number;
}

export interface Spell {
  page: number;
  name: string;
  variants: Array<{ name: string }>;
}

export interface RawEquipemnt extends Child {
  attributes: {
    name: string;
    bezeichner: string;
    bfakt: number;
    bfmin: number;
    hand: string;
    schild: string;
    set: string;
    slot: string;
    talent: string;
    waffenname: string;
    nummer: number;
  };
}

export interface RawProperty extends Child {
  attributes: {
    name: string;
    mod: string;
    startwert: string;
    value: string;
    grossemeditation: string;
    mrmod: string;
  };
}

export interface Weapon {
  name: string;
}
