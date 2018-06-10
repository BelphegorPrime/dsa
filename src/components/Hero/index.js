import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';

import Base from '../Base';
import Properties from '../Properties';
import Advantages from '../Advantages';
import SpecialAbilities from '../SpecialAbilities';
import TalentList from '../TalentList';
import SpellList from '../SpellList';
// import Fight from '../Fight';
import Objects from '../Objects';
import Comments from '../Comments';
import Equipment from '../Equipment';
import Connections from '../Connections';
import Purse from '../Purse';

class Hero extends Component {
  render() {
    const { hero, page } = this.props;
    if (!hero) {
      return null;
    }
    const [
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      ,
      fight,
      ,
      ,
      comments,
      equipment,
      ,
      ,
      purse
    ] = hero.xml.children[0].children;
    console.log(hero.converted);

    switch (page) {
      case 'Basis': {
        return (
          <Fragment>
            <Base base={hero.converted.basics} className="col-md-2" />
            <Properties
              properties={hero.converted.properties}
              className="col-md-3"
            />
            <Advantages
              advantages={hero.converted.advantages}
              className="col-md-2"
            />
            <SpecialAbilities
              specialAbilities={hero.converted.specialAbilities}
              className="col-md-3"
            />
            {hero.converted.connections ? (
              <Connections
                connections={hero.converted.connections}
                className="col-md-2"
              />
            ) : null}
          </Fragment>
        );
      }
      case 'Talente': {
        return (
          <TalentList
            talentList={hero.converted.talentList}
            properties={hero.converted.properties}
            fight={fight}
            className="col-md-12"
          />
        );
      }
      case 'Zauber': {
        return (
          <SpellList
            spellList={hero.converted.spellList}
            properties={hero.converted.properties}
            className="col-md-12"
          />
        );
      }
      case 'Kampf': {
        return (
          <Fragment>
            <Objects objects={hero.converted.objects} className="col-md-4" />
            <Equipment equipment={equipment} className="col-md-4" />
            <Purse purse={purse} className="col-md-4" />
          </Fragment>
        );
      }
      case 'Kommentare': {
        return <Comments comments={comments} className="col-md-12" />;
      }
      default:
        return null;
    }
  }
}

Hero.propTypes = {
  hero: proptypes.object,
  page: proptypes.string
};

export default Hero;
