import produce from "immer";
import { Encounter } from "../../components/Battle";
import { objectWithoutKey } from "../../helperFunctions";
import { Electron, Hero, HouseRule } from "../../types";
import { HerosObject } from "./MainContext";

export enum ActionTypes {
  "TOGGLE_NAVBAR" = "TOGGLE_NAVBAR",
  "SET_PAGE" = "SET_PAGE",
  "SET_HERO_PAGE" = "SET_HERO_PAGE",
  "SET_HOUSE_RULE_TO_SHOW" = "SET_HOUSE_RULE_TO_SHOW",
  "SET_HEROS" = "SET_HEROS",
  "SET_CHOSEN_HERO" = "SET_CHOSEN_HERO",
  "SET_HOUSE_RULES" = "SET_HOUSE_RULES",
  "SET_ENCOUNTER" = "SET_ENCOUNTER",
  "SET_ACTIVE_ENCOUNTER" = "SET_ACTIVE_ENCOUNTER",
  "REMOVE_HERO" = "REMOVE_HERO",
}

export enum Page {
  "default" = "default",
  "mastermode" = "mastermode",
  "battlemode" = "battlemode",
  "houserules" = "houserules",
  "map" = "map",
}

export enum HeroPage {
  "Basis" = "Basis",
  "Talente" = "Talente",
  "Zauber" = "Zauber",
  "Kampf" = "Kampf",
  "Kommentare" = "Kommentare",
}

export enum HouseRuleEnum {
  "templates" = "templates",
  "spell" = "spell",
  "weapon" = "weapon",
}

export type Action = {
  type: ActionTypes;
  data:
    | string
    | boolean
    | Page
    | HeroPage
    | HouseRuleEnum
    | HerosObject
    | (Hero | null)
    | HouseRule[]
    | Encounter[]
    | (Encounter | null);
};

export type State<T extends boolean> = {
  electron: T extends true ? Electron : null;
  data: {
    showNavBar: boolean;
    page: Page;
    heroPage: HeroPage;
    houseRuleToShow: HouseRuleEnum;
    heros: HerosObject;
    chosenHero: Hero | null;
    houseRules: HouseRule[];
    encounter: Encounter[];
    activeEncounter: Encounter | null;
  };
};

export const getInitArgs = <T extends boolean>(
  electron: T extends true ? Electron : null,
  data: {
    heros?: HerosObject;
    chosenHero?: Hero | null;
    houseRules?: HouseRule[];
    encounter?: Encounter[];
    activeEncounter?: Encounter | null;
  }
): State<T> => {
  return {
    electron,
    data: {
      showNavBar: false,
      page: Page.default,
      heroPage: HeroPage.Basis,
      houseRuleToShow: HouseRuleEnum.templates,
      heros: data.heros || {},
      chosenHero: data.chosenHero || null,
      houseRules: data.houseRules || [],
      encounter: data.encounter || [],
      activeEncounter: data.activeEncounter || null,
    },
  };
};

export const mainReducer = (state: State<boolean>, action: Action) => {
  const nextState = produce(state as State<boolean>, (draftState) => {
    switch (action.type) {
      case ActionTypes.TOGGLE_NAVBAR: {
        draftState.data.showNavBar = action.data as boolean;
        break;
      }
      case ActionTypes.SET_PAGE: {
        draftState.data.page = action.data as Page;
        break;
      }
      case ActionTypes.SET_HERO_PAGE: {
        draftState.data.heroPage = action.data as HeroPage;
        break;
      }
      case ActionTypes.SET_HOUSE_RULE_TO_SHOW: {
        draftState.data.houseRuleToShow = action.data as HouseRuleEnum;
        break;
      }
      case ActionTypes.SET_HEROS: {
        draftState.data.heros = action.data as HerosObject;
        break;
      }
      case ActionTypes.SET_CHOSEN_HERO: {
        draftState.data.chosenHero = action.data as Hero | null;
        break;
      }
      case ActionTypes.SET_HOUSE_RULES: {
        draftState.data.houseRules = action.data as HouseRule[];
        break;
      }
      case ActionTypes.SET_ENCOUNTER: {
        draftState.data.encounter = action.data as Encounter[];
        break;
      }
      case ActionTypes.SET_ACTIVE_ENCOUNTER: {
        draftState.data.activeEncounter = action.data as Encounter | null;
        break;
      }
      case ActionTypes.REMOVE_HERO: {
        const name = action.data as string;
        draftState.data.heros = objectWithoutKey(draftState.data.heros, name);
        if (
          draftState.data.chosenHero &&
          draftState.data.chosenHero.converted.name === name
        ) {
          draftState.data.chosenHero = null;
        }
        break;
      }
    }
  });

  // DEBUG State Changes
  console.log(action.type, nextState, action);

  return nextState;
};
