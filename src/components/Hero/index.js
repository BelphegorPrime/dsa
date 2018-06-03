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
      console.log(purse)
      return (
        <Fragment>
          <Base name={name} base={base} />
          <Properties properties={properties} />
          <Advantages advantages={advantages} />
          <SpecialAbilities specialAbilities={specialAbilities} />
          <TalentList talentList={talentList} />
          <SpellList spellList={spellList} />
          <Fight fight={fight} />
          <Objects objects={objects} />
          <Comments comments={comments} />
          <Equipment equipment={equipment} />
          <Connections connections={connections} />
          <Purse purse={purse} />
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
