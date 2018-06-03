import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';

import Base from '../Base';
import Properties from '../Properties';
import Advantages from '../Advantages';
import SpecialAbilities from '../SpecialAbilities';
import TalentList from '../TalentList';
import SpellList from '../SpellList';
import Fight from '../Fight';
import Objects from '../Objects';
import Comments from '../Comments';
import Equipment from '../Equipment';
import Connections from '../Connections';
import Purse from '../Purse';

class App extends Component {
  render() {
    const { hero } = this.props;
    if (hero) {
      const { name } = hero.children[0].attributes;
      const [
        ,
        base,
        properties,
        advantages,
        specialAbilities,
        ,
        talentList,
        spellList,
        fight,
        objects,
        ,
        comments,
        equipment,
        connections,
        ,
        purse
      ] = hero.children[0].children;
      return (
        <Fragment>
          <Base name={name} base={base} className="col-md-3" />
          <Properties properties={properties} className="col-md-3" />
          <Advantages advantages={advantages} className="col-md-3" />
          <SpecialAbilities
            specialAbilities={specialAbilities}
            className="col-md-3"
          />
          <TalentList talentList={talentList} className="col-md-3" />
          {spellList.children.length > 0 ? (
            <SpellList spellList={spellList} className="col-md-3" />
          ) : null}
          <Fight fight={fight} className="col-md-3" />
          <Objects objects={objects} className="col-md-3" />
          <Comments comments={comments} className="col-md-3" />
          <Equipment equipment={equipment} className="col-md-3" />
          <Connections connections={connections} className="col-md-3" />
          <Purse purse={purse} className="col-md-3" />
        </Fragment>
      );
    }
    return null;
  }
}

App.propTypes = {
  hero: proptypes.object
};

export default App;
