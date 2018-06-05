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

class App extends Component {
  render() {
    const { hero, page } = this.props;
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
      const object = {
        base,
        properties,
        advantages,
        specialAbilities,
        talentList,
        spellList,
        fight,
        objects,
        comments,
        equipment,
        connections,
        purse
      };
      const baseProperties = properties.children
        .filter((e, i) => i <= 7)
        .map(p => {
          let propertieName = '';
          switch (p.attributes.name) {
            case 'Mut':
              propertieName = 'MU';
              break;
            case 'Klugheit':
              propertieName = 'KL';
              break;
            case 'Intuition':
              propertieName = 'IN';
              break;
            case 'Charisma':
              propertieName = 'CH';
              break;
            case 'Fingerfertigkeit':
              propertieName = 'FF';
              break;
            case 'Gewandtheit':
              propertieName = 'GE';
              break;
            case 'Konstitution':
              propertieName = 'KO';
              break;
            case 'Körperkraft':
              propertieName = 'KK';
              break;
            default:
              break;
          }
          return {
            name: propertieName,
            value: parseInt(p.attributes.value, 10)
          };
        });
      switch (page) {
        case 'Basis': {
          return (
            <Fragment>
              <Base name={name} base={base} className="col-md-3" />
              <Properties properties={properties} className="col-md-3" />
              <Advantages advantages={advantages} className="col-md-3" />
              <SpecialAbilities
                specialAbilities={specialAbilities}
                className="col-md-3"
              />
              <Connections connections={connections} className="col-md-3" />
            </Fragment>
          );
        }
        case 'Talente': {
          return (
            <TalentList
              talentList={talentList}
              baseProperties={baseProperties}
              fight={fight}
              className="col-md-3"
            />
          );
        }
        case 'Zauber': {
          return <SpellList spellList={spellList} className="col-md-3" />;
        }
        case 'Kampf': {
          return (
            <Fragment>
              <Objects objects={objects} className="col-md-3" />
              <Equipment equipment={equipment} className="col-md-3" />
              <Purse purse={purse} className="col-md-3" />
            </Fragment>
          );
        }
        case 'Kommentare': {
          return <Comments comments={comments} className="col-md-3" />;
        }
        default:
          null;
      }
    }
    return null;
  }
}

App.propTypes = {
  hero: proptypes.object,
  page: proptypes.string
};

export default App;
