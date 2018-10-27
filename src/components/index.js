/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';
import proptypes from 'prop-types';

import Head from './Head';
import Body from './Body';

import { convert } from '../heroConverter';

const App = props => {
  console.log(props);
  const [page, setPage] = useState('default');
  const [heros, setHeros] = useState(
    JSON.parse(window.localStorage.getItem('heros')) || {}
  );
  const [chosenHero, setChosenHero] = useState(
    JSON.parse(window.localStorage.getItem('hero')) || null
  );
  const [heroPage, setHeroPage] = useState(null);
  const [houseRules, setHouseRules] = useState(
    JSON.parse(window.localStorage.getItem('houseRules')) || []
  );
  const [houseRuleToShow, setHouseRuleToShow] = useState('templates');

  useEffect(
    () => {
      window.localStorage.setItem('heros', JSON.stringify(heros));
    },
    [heros]
  );

  useEffect(
    () => {
      window.localStorage.setItem('houseRules', JSON.stringify(houseRules));
    },
    [houseRules]
  );

  useEffect(
    () => {
      window.localStorage.setItem('hero', JSON.stringify(chosenHero));
    },
    [chosenHero]
  );

  const appendToState = (xml, converted) => {
    const { name } = xml.children[0].attributes;
    const composedHero = {
      xml,
      converted
    };
    setChosenHero(composedHero);
    setHeros(
      Object.assign(
        {
          [name]: composedHero
        },
        heros
      )
    );
  };

  const removeHero = name => {
    if (chosenHero && chosenHero.xml.children[0].attributes.name === name) {
      setChosenHero(null);
    }
    delete heros[name];
    setHeros(heros);
  };

  const resetState = () => {
    setPage('default');
    setHeros({});
    setChosenHero(null);
    setHeroPage(null);
    setHouseRules([]);
    setHouseRuleToShow('templates');
  };

  const updateHero = hero => {
    const { name } = hero.xml.children[0].attributes;
    heros[name] = hero;
    setChosenHero(hero);
    setHeros(heros);
  };

  const addedHouseRule = rule => {
    const otherHouseRules = houseRules.filter(r => r.page !== rule.page);
    otherHouseRules.push(rule);
    Object.keys(heros).forEach(name => {
      const { xml } = heros[name];
      appendToState(xml, convert(xml, otherHouseRules));
    });
    setHouseRules(otherHouseRules);
  };

  const removeRule = id => {
    const otherHouseRules = houseRules.filter(hr => hr.id !== id);
    Object.keys(heros).forEach(name => {
      const { xml } = heros[name];
      appendToState(xml, convert(xml, otherHouseRules));
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
        addedHouseRule={addedHouseRule}
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
