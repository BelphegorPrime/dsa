// @ts-ignore
// tslint:disable-next-line:no-implicit-dependencies
import * as Node from "node";
import { ChildAttributes, RawHero } from "./rawTypes";

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

export interface BattleHero extends Hero {
  id: string;
  name: string;
  init: number;
  ini?: number;
  isPlayer?: boolean;
}

export interface Comment {
  name?: string;
  comment?: string;
  id?: string;
  duration?: string;
  cost?: string;
  trial?: string[];
  trialProperties?: string[];
  specialAbility?: string;
  specialAbilityName?: string;
  effect?: string;
  added?: boolean;
}

export interface Connection {
  name: string;
  description: string;
  socialStatus: string;
}

export interface ConvertedHero {
  name?: string;
  weapons?: Equipment;
  basics?: Basic;
  properties?: Property;
  events?: Event[];
  objects?: ObjectType;
  purse?: Purse;
  fight?: Fight;
  comments?: Comment[];
  specialAbilities?: SpecialAbilities;
  talentList?: TalentList;
  advantages?: Vantage[];
  disadvantages?: Vantage[];
  spellList?: SpellList;
  connections?: Connection[];
  [key: string]: any;
}

export interface Electron {
  instance: any;
  ipcRenderer: any;
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

export interface Fight {
  [name: string]: {
    attack: number;
    parade: number;
  };
}

export interface Hero {
  converted: ConvertedHero;
  xml: RawHero;
}

export interface HouseRule {
  id: string;
  type: string;
  page: number;
  name: string;
  TP: number;
  "TP/KK": string;
  mass: string;
  length: string;
  BF: string;
  INI: string;
  cost: string;
  WM: string;
  comment: string;
  DK: string;
  talent: string;
  distribution: string;
  additionalModification: {
    name: string;
    effect: string;
    mod: string;
    minZfW: number;
  }[];
}

export interface Liturgie {
  name: string;
  page: number;
  grade: number;
  target: string;
  distance: string;
  kind: string;
  ritualDuration: string;
  duration: string;
  execution: string;
  effect: string;
  remark: string;
  gods: string[];
  variants: {
    grade: number;
    effect: string;
  }[];
  alternativeNames: { name: string; god: string; grade: number }[];
}

export interface MainProperties {
  MU: string;
  KL: string;
  IN: string;
  CH: string;
  FF: string;
  GE: string;
  KO: string;
  KK: string;
}

export interface ObjectType {
  [name: string]: {
    slot?: number;
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

export interface Purse {
  [name: string]: {
    amount: number;
    country: string;
    name: string;
    position: number;
  };
}

export interface SpecialAbilities {
  specialAbilities: {
    name: string;
    values?: string[];
    liturgy?: Liturgie;
  }[];
  cheapenedSpecialAbilities: {
    name: string;
  }[];
}

export interface Spell {
  name: string;
  trial: string[];
  learningMethode: string;
  remarks: string;
  homeSpell: boolean;
  complexity: string;
  cost: string;
  distance: string;
  representation: string;
  duration: string;
  castTime: string;
  spellComment: string;
  trialProperties: (string | null)[];
  value: string;
  variant: string;
  technik?: string;
  effect?: string;
  target?: string;
  modifications?: string[];
  reversalis?: string;
  antimagic?: string;
  characteristics?: string[];
  distribution?: { representation: string; distribution: number }[];
  page?: number;
  fromLCD?: boolean;
  variants?: {
    name: string;
    effect: string;
    minZfW: number;
    mod: string;
  }[];
}

export interface SpellList {
  [name: string]: Spell;
}

export interface TalentList {
  [name: string]: {
    learningMethode: string;
    trial: string[];
    trialProperties: (string | null)[];
    value: string;
    attack?: number;
    parade?: number;
    k?: string;
  };
}

export interface Vantage {
  name: string;
  value?: string | number;
  isAdvantage: boolean | null;
}

export interface Weapon {
  name: string;
}
