import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Route,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useBoolean } from "react-use";
import { objectWithoutKey } from "../helperFunctions";
import { convert } from "../heroConverter";
import useSave from "../hooks/useSave";
import { Hero as HeroType, HouseRule } from "../types";
import Battle from "./Battle";
import Header from "./Head";
import Hero from "./Hero";
import HouseRules from "./HouseRules";
import Map from "./Map";
import Master from "./Master";
import Music from "./Music";
import Nav from "./Nav";
import NoMatch from "./NoMatch";

interface HeroState {
  [name: string]: HeroType;
}

const App = (props: any) => {
  const { electron } = props;
  const [showNavBar, toggleNavBar] = useBoolean(false);
  const [page, setPage] = useState("default");
  const [heroPage, setHeroPage] = useState("Basis");
  const [houseRuleToShow, setHouseRuleToShow] = useState("templates");

  const [heros, setHeros] = useSave(electron, "heros", {} as any);
  const [chosenHero, setChosenHero] = useSave(electron, "chosenHero");
  const [houseRules, setHouseRules] = useSave(
    electron,
    "houseRules",
    [] as any
  );
  const [encounter, setEncounter] = useSave(electron, "encounter", [] as any);
  const [activeEncounter, setActiveEncounter] = useSave(
    electron,
    "activeEncounter"
  );
  useEffect(() => setHeros(heros), [heros, setHeros]);
  useEffect(() => setChosenHero(chosenHero), [chosenHero, setChosenHero]);
  useEffect(() => setHouseRules(houseRules), [houseRules, setHouseRules]);

  const removeHero = (name: string) => {
    setHeros(objectWithoutKey(heros, name));
    if (chosenHero && chosenHero.converted.name === name) {
      setChosenHero(null);
    }
  };

  const resetState = () => {
    setPage("default");
    setHeros({});
    setChosenHero(null);
    setHeroPage("Basis");
    setHouseRules([]);
    setHouseRuleToShow("templates");
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
              [h.converted.name]: h
            };
          }
          return null;
        })
        .reduce((acc, val) => ({ ...acc, ...val }), {})
    };
    setHeros(newHeros);
    setChosenHero(composedHeros[composedHeros.length - 1]);
  };

  const addNewHouseRules = (rules: HouseRule[]) => {
    const otherHouseRules = houseRules
      .filter((r: HouseRule) => rules.map(ru => ru.id).indexOf(r.id) === -1)
      .concat(...rules);
    Object.keys(heros).forEach(name => {
      const { xml } = heros[name];
      appendToState([
        {
          xml,
          converted: convert(xml, otherHouseRules)
        }
      ]);
    });
    setHouseRules(otherHouseRules);
  };

  const removeRule = (id: string) => {
    const otherHouseRules = houseRules.filter((hr: HouseRule) => hr.id !== id);
    Object.keys(heros).forEach(name => {
      const { xml } = heros[name];
      appendToState([
        {
          xml,
          converted: convert(xml, otherHouseRules)
        }
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
          page={page}
          houseRules={houseRules}
          appendToState={appendToState}
          resetState={resetState}
          toggleNavBar={setToggleNavbar}
          setHeros={setHeros}
          setEncounter={setEncounter}
          setActiveEncounter={setActiveEncounter}
        />
        {showNavBar ? (
          <Nav handleChange={setPage} page={page} toggleNavBar={toggleNavBar} />
        ) : null}
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} classNames="fade" timeout={300}>
                <div id="app-body" className="row">
                  <Switch>
                    <Route
                      exact
                      path="/music"
                      render={(renderProps: RouteComponentProps) => (
                        <Music {...renderProps} />
                      )}
                    />
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
                          setHouseRuleToShow={setHouseRuleToShow}
                          houseRuleToShow={houseRuleToShow}
                          houseRules={houseRules}
                          removeRule={removeRule}
                        />
                      )}
                    />
                    <Route
                      exact
                      path="/mastermode"
                      render={renderProps => (
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
                      render={renderProps => (
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
                      render={renderProps => (
                        <Hero
                          {...renderProps}
                          heros={heros}
                          chosenHero={chosenHero || null}
                          page={heroPage}
                          showPage={setHeroPage}
                          chooseHero={chooseHero}
                          removeHero={removeHero}
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

export default App;
