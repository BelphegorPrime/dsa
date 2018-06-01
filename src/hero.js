import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';

import Base from './components/Base';
import Properties from './components/Properties';

class App extends Component {
  render() {
    const { hero } = this.props;
    if (hero) {
      const { name } = hero.children[0].attributes;
      const [
        mods,
        base,
        properties,
        advantages,
        specialAbilities,
        events,
        talentList,
        spellList,
        fight,
        objects,
        boniWeaponlees,
        comments,
        equipment,
        connections,
        extension,
        purse,
        pluginData
      ] = hero.children[0].children;
      console.log(advantages.children);
      return (
        <Fragment>
          <Base name={name} base={base} />
          <Properties properties={properties} />
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
