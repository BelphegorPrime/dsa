/* eslint-disable no-undef */
import React, { useState, useEffect, Suspense } from 'react';
import proptypes from 'prop-types';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { convert } from '../heroConverter';
import { isJSON, objectWithoutKey } from '../helperFunctions';

// import Head from './Head';
// import Nav from './Nav';
// import Hero from './Hero';
// import Master from './Master';
// import HouseRules from './HouseRules';
// import NoMatch from './NoMatch';
import Spinner from './Spinner';

const Head = React.lazy(() => import('./Head'));
const Nav = React.lazy(() => import('./Nav'));
const Hero = React.lazy(() => import('./Hero'));
const Master = React.lazy(() => import('./Master'));
const HouseRules = React.lazy(() => import('./HouseRules'));
const Map = React.lazy(() => import('./Map'));
const NoMatch = React.lazy(() => import('./NoMatch'));

const App = props => {
  // console.log(props);
  const [showNavBar, toggleNavBar] = useState(false);
  const [page, setPage] = useState('default');
  const [heroPage, setHeroPage] = useState('Basis');
  const [houseRuleToShow, setHouseRuleToShow] = useState('templates');

  const [heros, setHeros] = useState(
    isJSON(window.localStorage.getItem('heros')) || {}
  );

  useEffect(() => window.localStorage.setItem('heros', JSON.stringify(heros)));

  const [chosenHero, setChosenHero] = useState(
    isJSON(window.localStorage.getItem('chosenHero')) || null
  );
  useEffect(
    () => window.localStorage.setItem('chosenHero', JSON.stringify(chosenHero)),
    [chosenHero]
  );

  const [houseRules, setHouseRules] = useState(
    isJSON(window.localStorage.getItem('houseRules')) || []
  );
  useEffect(() =>
    window.localStorage.setItem('houseRules', JSON.stringify(houseRules))
  );

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
    <HashRouter>
      <Suspense fallback={<Spinner />}>
        <div className="App cursor-default">
          <Head
            chosenHero={chosenHero}
            page={page}
            houseRules={houseRules}
            handleChange={setPage}
            appendToState={appendToState}
            resetState={resetState}
            toggleNavBar={setToggleNavbar}
          />
          {showNavBar ? (
            <Nav
              handleChange={setPage}
              page={page}
              toggleNavBar={toggleNavBar}
            />
          ) : null}
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames="fade"
                  timeout={300}>
                  <div id="app-body" className="row">
                    <Switch>
                      <Route
                        exact
                        path="/map"
                        render={renderProps => (
                          <Map {...renderProps} />
                        )}
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
      </Suspense>
    </HashRouter>
  );
};

App.protoTypes = {
  electron: proptypes.object
};

export default App;
