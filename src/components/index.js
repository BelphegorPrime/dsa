/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import proptypes from 'prop-types';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { convert } from '../heroConverter';
import { objectWithoutKey } from '../helperFunctions';
import useSave from '../hooks/useSave';

import Head from './Head';
import Nav from './Nav';
import Hero from './Hero';
import Master from './Master';
import Battle from './Battle';
import HouseRules from './HouseRules';
import NoMatch from './NoMatch';
import Map from './Map';
import Music from './Music';

const App = props => {
  const { electron } = props;
  const [showNavBar, toggleNavBar] = useState(false);
  const [page, setPage] = useState('default');
  const [heroPage, setHeroPage] = useState('Basis');
  const [houseRuleToShow, setHouseRuleToShow] = useState('templates');

  const [heros, setHeros] = useSave(electron, 'heros', {});
  const [chosenHero, setChosenHero] = useSave(electron, 'chosenHero');
  const [houseRules, setHouseRules] = useSave(electron, 'houseRules', []);
  const [encounter, setEncounter] = useSave(electron, 'encounter', []);
  const [activeEncounter, setActiveEncounter] = useSave(
    electron,
    'activeEncounter',
    null
  );
  useEffect(() => setHeros(heros));
  useEffect(() => setChosenHero(chosenHero), [chosenHero]);
  useEffect(() => setHouseRules(houseRules));

  const removeHero = name => {
    setHeros(objectWithoutKey(heros, name));
    if (chosenHero && chosenHero.converted.name === name) {
      setChosenHero(null);
    }
  };

  const resetState = () => {
    setPage('default');
    setHeros({});
    setChosenHero(null);
    setHeroPage('Basis');
    setHouseRules([]);
    setHouseRuleToShow('templates');
  };

  const updateHero = hero => {
    const { name } = hero.xml.children[0].attributes;
    heros[name] = hero;
    setChosenHero(hero);
    setHeros(heros);
  };

  const appendToState = composedHeros => {
    const newHeros = Object.assign(
      heros,
      composedHeros
        .map(h => ({
          [h.converted.name]: h
        }))
        .reduce((acc, val) => Object.assign(acc, val), {})
    );
    setHeros(newHeros);
    setChosenHero(composedHeros[composedHeros.length - 1]);
  };

  const addNewHouseRules = rules => {
    const otherHouseRules = houseRules
      .filter(r => rules.map(ru => ru.id).indexOf(r.id) === -1)
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

  const removeRule = id => {
    const otherHouseRules = houseRules.filter(hr => hr.id !== id);
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

  const chooseHero = name => {
    setChosenHero(heros[name]);
  };

  const setToggleNavbar = () => {
    toggleNavBar(!showNavBar);
  };

  return (
    <Router>
      <div className="App cursor-default">
        <Head
          chosenHero={chosenHero}
          page={page}
          houseRules={houseRules}
          handleChange={setPage}
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
                      render={renderProps => <Music {...renderProps} />}
                    />
                    <Route
                      exact
                      path="/map"
                      render={renderProps => <Map {...renderProps} />}
                    />
                    <Route
                      exact
                      path="/houserules"
                      render={renderProps => (
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
                          electron={electron}
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

App.propTypes = {
  electron: proptypes.object
};

export default App;
