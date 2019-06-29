export interface Child {
  name: string;
  attributes: ChildAttributes;
  parent: null;
  type: string;
  value?: string;
  children: Child[];
}

export interface ChildAttributes {
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
  waehrung?: string;
  probe?: string;
  dauer?: string;
  kosten?: string;
  sf?: string;
  sfname?: string;
  wirkung?: string;
  lernmethode?: string;
  k?: string;
  anmerkungen?: string;
  reichweite?: string;
  repraesentation?: string;
  variante?: string;
  wirkungsdauer?: string;
  zauberdauer?: string;
  zauberkommentar?: string;
  beschreibung?: string;
  so?: string;
  bezeichner?: string;
  bfakt?: number;
  bfmin?: number;
  hand?: string;
  schild?: string;
  set?: string;
  talent?: string;
  waffenname?: string;
  nummer?: number;
  [key: string]: string | number | boolean | undefined;
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

export interface RawHero {
  children: Child[];
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
