import React, { Fragment } from 'react';
import proptypes from 'prop-types';

import Base from './Base';
import Properties from './Properties';
import Advantages from './Advantages';
import SpecialAbilities from './SpecialAbilities';
import TalentList from './TalentList';
import SpellList from './SpellList';
import Objects from './Objects';
import Comments from './Comments';
import Equipment from './Equipment';
import Connections from './Connections';
import Purse from './Purse';

const Hero = props => {
  const { hero, page, updateHero } = props;
  if (!hero) {
    return null;
  }
  const { converted } = hero;
  switch (page) {
    case 'Basis': {
      return (
        <Fragment>
          <Base hero={hero} updateHero={updateHero} className="col-6" />
          <Advantages
            advantages={converted.advantages}
            disadvantages={converted.disadvantages}
            className="col-6"
          />
          <hr className="col-12" />
          <Properties properties={converted.properties} className="col-6" />
          <SpecialAbilities
            specialAbilities={converted.specialAbilities}
            className="col-6"
          />
          <hr className="col-12" />
          {converted.connections ? (
            <Connections
              connections={converted.connections}
              className="col-6"
            />
          ) : null}
        </Fragment>
      );
    }
    case 'Talente': {
      return (
        <TalentList
          talentList={converted.talentList}
          properties={converted.properties}
          className="col-12"
        />
      );
    }
    case 'Zauber': {
      return (
        <SpellList
          spellList={converted.spellList}
          properties={converted.properties}
          className="col-12"
        />
      );
    }
    case 'Kampf': {
      return (
        <Fragment>
          <Objects hero={hero} updateHero={updateHero} className="col-4" />
          <Equipment weapons={converted.weapons} className="col-4" />
          <Purse hero={hero} updateHero={updateHero} className="col-4" />
        </Fragment>
      );
    }
    case 'Kommentare': {
      return (
        <Comments hero={hero} updateHero={updateHero} className="col-12" />
      );
    }
    default:
      return null;
  }
};

Hero.propTypes = {
  hero: proptypes.object,
  page: proptypes.string,
  updateHero: proptypes.func
};

export default Hero;
