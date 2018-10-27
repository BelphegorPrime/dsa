/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import proptypes from 'prop-types';

import Head from './Head';
import Body from './Body';

import { convert } from '../heroConverter';
import { isJSON, objectWithoutKey } from '../helperFunctions';

const App = props => {
  // console.log(props);
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

  return (
    <div className="App cursor-default">
      <Head
        chosenHero={chosenHero}
        page={page}
        houseRules={houseRules}
        handleChange={setPage}
        appendToState={appendToState}
        resetState={resetState}
      />
      <Body
        page={page}
        heros={heros}
        chosenHero={chosenHero}
        heroPage={heroPage}
        houseRules={houseRules}
        houseRuleToShow={houseRuleToShow}
        chooseHero={chooseHero}
        removeHero={removeHero}
        showHeroPage={setHeroPage}
        updateHero={updateHero}
        addNewHouseRules={addNewHouseRules}
        setHouseRuleToShow={setHouseRuleToShow}
        removeRule={removeRule}
      />
    </div>
  );
};

App.protoTypes = {
  electron: proptypes.object
};

export default App;
