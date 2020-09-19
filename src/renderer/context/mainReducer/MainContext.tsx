import React, { Dispatch, Reducer, useMemo } from "react";
import { Encounter } from "../../components/Battle";
import { objectWithoutKey } from "../../helperFunctions";
import useSave from "../../hooks/useSave";
import { Electron, Hero, HouseRule } from "../../types";
import { mainReducer, getInitArgs, State, Action } from "./mainReducer";
import { Callbacks, getCallbacks } from "./callbacks";

type MainReducerProviderProps = {
  children: React.ReactElement;
  electron: Electron;
};

// tslint:disable-next-line:no-empty
const noop = () => {};

const MainContext = React.createContext<State<boolean>>(
  getInitArgs<false>(null, {})
);
const DispatchContext = React.createContext<Dispatch<Action>>(noop);
const CallbackContext = React.createContext<Callbacks<boolean>>(
  getCallbacks<false>(noop, {
    setHeros: null,
    setChosenHero: null,
    setEncounter: null,
    setHouseRules: null,
    setActiveEncounter: null,
    removeHero: null,
  })
);

const MainContextProvider = MainContext.Provider;
const DispatchContextProvider = DispatchContext.Provider;
const CallbackContextProvider = CallbackContext.Provider;

export type HerosObject = {
  [name: string]: Hero;
};

const MainReducerProvider = ({
  children,
  electron,
}: MainReducerProviderProps) => {
  const [heros, setHeros] = useSave<HerosObject>(electron, "heros", {} as any);
  const [chosenHero, setChosenHero] = useSave<Hero | null>(
    electron,
    "chosenHero"
  );
  const [houseRules, setHouseRules] = useSave<HouseRule[]>(
    electron,
    "houseRules",
    [] as any
  );
  const [encounter, setEncounter] = useSave<Encounter[]>(
    electron,
    "encounter",
    [] as any
  );
  const [activeEncounter, setActiveEncounter] = useSave<Encounter | null>(
    electron,
    "activeEncounter"
  );

  const removeHero = (name: string) => {
    setHeros(objectWithoutKey(heros, name));
    if (chosenHero && chosenHero.converted.name === name) {
      setChosenHero(null);
    }
  };

  const initArgs = getInitArgs<true>(electron, {
    heros,
    chosenHero,
    houseRules,
    encounter,
    activeEncounter,
  });
  const [state, dispatch] = React.useReducer<Reducer<State<true>, Action>>(
    mainReducer,
    initArgs
  );
  const callbacks = useMemo(
    () =>
      getCallbacks<true>(dispatch, {
        setHeros,
        setChosenHero,
        setHouseRules,
        setEncounter,
        setActiveEncounter,
        removeHero,
      }),
    [dispatch, setHeros]
  );

  return (
    <DispatchContextProvider value={dispatch}>
      <CallbackContextProvider value={callbacks}>
        <MainContextProvider value={state}>{children}</MainContextProvider>
      </CallbackContextProvider>
    </DispatchContextProvider>
  );
};

function useMainReducerState<T extends boolean>(): State<T> {
  return React.useContext(MainContext);
}

function useMainReducerCallbacks<T extends boolean>(): Callbacks<T> {
  return React.useContext(CallbackContext);
}

function useMainReducer<T extends boolean>(): [State<T>, Callbacks<T>] {
  return [useMainReducerState<T>(), useMainReducerCallbacks<T>()];
}

export {
  MainReducerProvider,
  useMainReducer,
  useMainReducerState,
  useMainReducerCallbacks,
};
