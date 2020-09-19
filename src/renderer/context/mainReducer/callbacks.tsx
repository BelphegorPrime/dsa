import { Dispatch } from "react";
import { Encounter } from "../../components/Battle";
import { Hero, HouseRule } from "../../types";
import { HerosObject } from "./MainContext";
import {
  Action,
  ActionTypes,
  HeroPage,
  HouseRuleEnum,
  Page,
} from "./mainReducer";

export type setHerosFuncType = (heros: HerosObject) => void;
export type setChosenHeroFuncType = (hero: Hero | null) => void;
export type setHouseRulesFuncType = (houseRules: HouseRule[]) => void;
export type setEncounterFuncType = (encounter: Encounter[]) => void;
export type setActiveEncounterFuncType = (
  activeEncounter: Encounter | null
) => void;
export type removeHeroFuncType = (name: string) => void;

export type Callbacks<T extends boolean> = {
  setHeros: T extends true ? setHerosFuncType : null;
  setChosenHero: T extends true ? setChosenHeroFuncType : null;
  setHouseRules: T extends true ? setHouseRulesFuncType : null;
  setEncounter: T extends true ? setEncounterFuncType : null;
  setActiveEncounter: T extends true ? setActiveEncounterFuncType : null;
  removeHero: T extends true ? removeHeroFuncType : null;
  toggleNavBar: (data: boolean) => void;
  setPage: (data: Page) => void;
  setHeroPage: (data: HeroPage) => void;
  setHouseRuleToShow: (data: HouseRuleEnum) => void;
};

export const getCallbacks = <T extends boolean>(
  dispatch: Dispatch<Action>,
  funcs: {
    setHeros: setHerosFuncType | null;
    setChosenHero: setChosenHeroFuncType | null;
    setHouseRules: setHouseRulesFuncType | null;
    setEncounter: setEncounterFuncType | null;
    setActiveEncounter: setActiveEncounterFuncType | null;
    removeHero: removeHeroFuncType | null;
  }
): Callbacks<T> => {
  const toggleNavBar = (data: boolean) =>
    dispatch({ type: ActionTypes.TOGGLE_NAVBAR, data });

  const setPage = (data: Page) =>
    dispatch({ type: ActionTypes.SET_PAGE, data });

  const setHeroPage = (data: HeroPage) =>
    dispatch({ type: ActionTypes.SET_HERO_PAGE, data });

  const setHouseRuleToShow = (data: HouseRuleEnum) =>
    dispatch({ type: ActionTypes.SET_HOUSE_RULE_TO_SHOW, data });

  const setHeros = (funcs.setHeros
    ? (heros: HerosObject) => {
        if (funcs.setHeros) {
          dispatch({ type: ActionTypes.SET_HEROS, data: heros });
          funcs.setHeros(heros);
        }
      }
    : null) as T extends true ? setHerosFuncType : null;

  const setChosenHero = (funcs.setChosenHero
    ? (hero: Hero | null) => {
        if (funcs.setChosenHero) {
          dispatch({ type: ActionTypes.SET_CHOSEN_HERO, data: hero });
          funcs.setChosenHero(hero);
        }
      }
    : null) as T extends true ? setChosenHeroFuncType : null;

  const setHouseRules = (funcs.setHouseRules
    ? (houseRules: HouseRule[]) => {
        if (funcs.setHouseRules) {
          dispatch({ type: ActionTypes.SET_HOUSE_RULES, data: houseRules });
          funcs.setHouseRules(houseRules);
        }
      }
    : null) as T extends true ? setHouseRulesFuncType : null;

  const setEncounter = (funcs.setEncounter
    ? (encounter: Encounter[]) => {
        if (funcs.setEncounter) {
          dispatch({ type: ActionTypes.SET_ENCOUNTER, data: encounter });
          funcs.setEncounter(encounter);
        }
      }
    : null) as T extends true ? setEncounterFuncType : null;

  const setActiveEncounter = (funcs.setActiveEncounter
    ? (activeEncounter: Encounter | null) => {
        if (funcs.setActiveEncounter) {
          dispatch({
            type: ActionTypes.SET_ACTIVE_ENCOUNTER,
            data: activeEncounter,
          });
          funcs.setActiveEncounter(activeEncounter);
        }
      }
    : null) as T extends true ? setActiveEncounterFuncType : null;

  const removeHero = (funcs.removeHero
    ? (name: string) => {
        if (funcs.removeHero) {
          dispatch({ type: ActionTypes.REMOVE_HERO, data: name });
          funcs.removeHero(name);
        }
      }
    : null) as T extends true ? removeHeroFuncType : null;

  return {
    setHeros,
    setChosenHero,
    setHouseRules,
    setEncounter,
    setActiveEncounter,
    removeHero,
    toggleNavBar,
    setPage,
    setHeroPage,
    setHouseRuleToShow,
  };
};
