import { Hero } from "./types";

export interface MasterProps {
  heros: { [name: string]: Hero };
  chooseHero: (hero: string) => void;
}

export interface MasterBodyProps {
  heros: { [name: string]: Hero };
  selectedHeros: string[];
}

export interface MasterSideBarProps {
  heros: { [name: string]: Hero };
  selectedHeros: string[];
  chooseHero: (name: string) => void;
  setSelectedHeros: (names: string[]) => void;
  withProperties: boolean;
}

export interface NavProps {
  toggleNavBar: (newState: boolean) => void;
}

export interface PropertiesQuickBarProps {
  hero: Hero;
  className: string;
  orientation: string;
}
