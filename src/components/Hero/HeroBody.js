import React, { Fragment } from 'react';
import proptypes from 'prop-types';

// import Base from './Base';
// import Properties from './Properties';
// import Advantages from './Advantages';
// import SpecialAbilities from './SpecialAbilities';
// import TalentList from './TalentList';
// import SpellList from './SpellList';
// import Objects from './Objects';
// import Comments from './Comments';
// import Equipment from './Equipment';
// import Connections from './Connections';
// import Purse from './Purse';
const Base = React.lazy(() => import('./Base'));
const Properties = React.lazy(() => import('./Properties'));
const Advantages = React.lazy(() => import('./Advantages'));
const SpecialAbilities = React.lazy(() => import('./SpecialAbilities'));
const TalentList = React.lazy(() => import('./TalentList'));
const SpellList = React.lazy(() => import('./SpellList'));
const Objects = React.lazy(() => import('./Objects'));
const Comments = React.lazy(() => import('./Comments'));
const Equipment = React.lazy(() => import('./Equipment'));
const Connections = React.lazy(() => import('./Connections'));
const Purse = React.lazy(() => import('./Purse'));

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
          <Base hero={hero} updateHero={updateHero} className="col-md-6" />
          <Advantages
            advantages={converted.advantages}
            disadvantages={converted.disadvantages}
            className="col-md-6"
          />
          <hr className="col-md-12" />
          <Properties properties={converted.properties} className="col-md-6" />
          <SpecialAbilities
            specialAbilities={converted.specialAbilities}
            className="col-md-6"
          />
          <hr className="col-md-12" />
          {converted.connections ? (
            <Connections
              connections={converted.connections}
              className="col-md-6"
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
          className="col-md-12"
        />
      );
    }
    case 'Zauber': {
      return (
        <SpellList
          spellList={converted.spellList}
          properties={converted.properties}
          className="col-md-12"
        />
      );
    }
    case 'Kampf': {
      return (
        <Fragment>
          <Objects hero={hero} updateHero={updateHero} className="col-md-4" />
          <Equipment weapons={converted.weapons} className="col-md-4" />
          <Purse hero={hero} updateHero={updateHero} className="col-md-4" />
        </Fragment>
      );
    }
    case 'Kommentare': {
      return (
        <Comments hero={hero} updateHero={updateHero} className="col-md-12" />
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
