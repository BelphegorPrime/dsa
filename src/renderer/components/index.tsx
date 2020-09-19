import React from "react";
import {
  HashRouter as Router,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useMainReducer } from "../context/mainReducer/MainContext";
import {
  HeroPage,
  HouseRuleEnum,
  Page,
} from "../context/mainReducer/mainReducer";
import { convert } from "../heroConverter";
import { Hero as HeroType, HouseRule } from "../types";
import Battle from "./Battle";
import Header from "./Head";
import Hero from "./Hero";
import HouseRules from "./HouseRules";
import Map from "./Map";
import Master from "./Master";
import Nav from "./Nav";
import NoMatch from "./NoMatch";

interface HeroState {
  [name: string]: HeroType;
}

const App = () => {
  const [
    {
      data: {
        showNavBar,
        heros,
        chosenHero,
        houseRules,
        encounter,
        activeEncounter,
      },
    },
    {
      toggleNavBar,
      setPage,
      setHeroPage,
      setHouseRuleToShow,
      setHeros,
      setChosenHero,
      setHouseRules,
      setEncounter,
      setActiveEncounter,
    },
  ] = useMainReducer<true>();

  // useEffect(() => setHeros(heros), [heros, setHeros]);
  // useEffect(() => setChosenHero(chosenHero), [chosenHero, setChosenHero]);
  // useEffect(() => setHouseRules(houseRules), [houseRules, setHouseRules]);

  const resetState = () => {
    setPage(Page.default);
    setHeros({});
    setChosenHero(null);
    setHeroPage(HeroPage.Basis);
    setHouseRules([]);
    setHouseRuleToShow(HouseRuleEnum.templates);
  };

  const updateHero = (hero: HeroType) => {
    const { name } = hero.xml.children[0].attributes;
    if (name) {
      heros[name] = hero;
      setChosenHero(hero);
      setHeros(heros);
    }
  };

  const appendToState = (composedHeros: HeroType[]) => {
    const newHeros = {
      ...heros,
      ...composedHeros
        .map((h: HeroType): HeroState | null => {
          if (h.converted.name) {
            return {
              [h.converted.name]: h,
            };
          }
          return null;
        })
        .reduce((acc, val) => ({ ...acc, ...val }), {}),
    };

    setHeros(newHeros);
    setChosenHero(composedHeros[composedHeros.length - 1]);
  };

  const addNewHouseRules = (rules: HouseRule[]) => {
    const otherHouseRules = houseRules
      .filter((r: HouseRule) => rules.map((ru) => ru.id).indexOf(r.id) === -1)
      .concat(...rules);
    Object.keys(heros).forEach((name) => {
      const { xml } = heros[name];
      appendToState([
        {
          xml,
          converted: convert(xml, otherHouseRules),
        },
      ]);
    });
    setHouseRules(otherHouseRules);
  };

  const removeRule = (id: string) => {
    const otherHouseRules = houseRules.filter((hr: HouseRule) => hr.id !== id);
    Object.keys(heros).forEach((name) => {
      const { xml } = heros[name];
      appendToState([
        {
          xml,
          converted: convert(xml, otherHouseRules),
        },
      ]);
    });
    setHouseRules(otherHouseRules);
  };

  const chooseHero = (name: string) => {
    setChosenHero(heros[name]);
  };

  const setToggleNavbar = () => {
    toggleNavBar(!showNavBar);
  };

  return (
    <Router>
      <div className="App cursor-default">
        <Header
          chosenHero={chosenHero}
          houseRules={houseRules}
          appendToState={appendToState}
          resetState={resetState}
          toggleNavBar={setToggleNavbar}
          setEncounter={setEncounter}
          setActiveEncounter={setActiveEncounter}
        />
        {showNavBar ? <Nav toggleNavBar={toggleNavBar} /> : null}
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} classNames="fade" timeout={300}>
                <div id="app-body" className="row">
                  <Switch>
                    <Route
                      exact
                      path="/map"
                      render={(renderProps: RouteComponentProps) => (
                        <Map {...renderProps} />
                      )}
                    />
                    <Route
                      exact
                      path="/houserules"
                      render={(renderProps: RouteComponentProps) => (
                        <HouseRules
                          {...renderProps}
                          addNewHouseRules={addNewHouseRules}
                          houseRules={houseRules}
                          removeRule={removeRule}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/mastermode"
                      render={(renderProps) => (
                        <Master
                          {...renderProps}
                          heros={heros}
                          chooseHero={chooseHero}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/battlemode"
                      render={(renderProps) => (
                        <Battle
                          {...renderProps}
                          heros={heros}
                          chooseHero={chooseHero}
                          encounter={encounter}
                          setEncounter={setEncounter}
                          activeEncounter={activeEncounter}
                          setActiveEncounter={setActiveEncounter}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/"
                      render={(renderProps) => (
                        <Hero
                          {...renderProps}
                          heros={heros}
                          chooseHero={chooseHero}
                          updateHero={updateHero}
                        />
                      )}
                    />
                    <Route component={NoMatch} />
                  </Switch>
                </div>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </div>
    </Router>
  );
};

export default React.memo(App);
