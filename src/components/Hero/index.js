import React, { Component, Fragment } from 'react';
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

class Hero extends Component {
  render() {
    const { hero, page } = this.props;
    if (!hero) {
      return null;
    }
    switch (page) {
      case 'Basis': {
        return (
          <Fragment>
            <Base
              hero={hero}
              updateHero={this.props.updateHero}
              className="col-md-6"
            />
            <Advantages
              advantages={hero.converted.advantages}
              disadvantages={hero.converted.disadvantages}
              className="col-md-6"
            />
            <hr className="col-md-12" />
            <Properties
              properties={hero.converted.properties}
              className="col-md-6"
            />
            <SpecialAbilities
              specialAbilities={hero.converted.specialAbilities}
              className="col-md-6"
            />
            <hr className="col-md-12" />
            {hero.converted.connections ? (
              <Connections
                connections={hero.converted.connections}
                className="col-md-6"
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
            <Equipment weapons={hero.converted.weapons} className="col-md-4" />
            <Purse
              hero={hero}
              updateHero={this.props.updateHero}
              className="col-md-4"
            />
          </Fragment>
        );
      }
      case 'Kommentare': {
        return (
          <Comments
            hero={hero}
            updateHero={this.props.updateHero}
            className="col-md-12"
          />
        );
      }
      default:
        return null;
    }
  }
}

Hero.propTypes = {
  hero: proptypes.object,
  page: proptypes.string,
  updateHero: proptypes.func
};

export default Hero;
