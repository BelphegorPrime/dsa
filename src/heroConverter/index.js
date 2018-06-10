import getEquipment from './getEquipment';
import getBasics from './getBasics';
import getProperties from './getProperties';
import getEvents from './getEvents';
import getObjects from './getObjects';
import getPurse from './getPurse';
import getFight from './getFight';
import getComments from './getComments';
import getSpecialAbilities from './getSpecialAbilities';
import getTalentList from './getTalentList';
import getAdvantages from './getAdvantages';
import getSpellList from './getSpellList';
import getConnections from './getConnections';

const index = hero => {
  const returnHero = {};
  returnHero.name = hero.children[0].attributes.name;
  const { children } = hero.children[0];
  console.log(children)
  children.forEach(child => {
    if (child.children.length > 0) {
      switch (child.name) {
        case 'ausrüstungen':
          returnHero.weapons = getEquipment(child.children);
          break;
        case 'basis':
          returnHero.basics = getBasics(child.children);
          break;
        case 'eigenschaften':
          returnHero.properties = getProperties(child.children);
          break;
        case 'ereignisse':
          returnHero.events = getEvents(child.children);
          break;
        case 'gegenstände':
          returnHero.objects = getObjects(child.children);
          break;
        case 'geldboerse':
          returnHero.purse = getPurse(child.children);
          break;
        case 'kampf':
          returnHero.fight = getFight(child.children);
          break;
        case 'kommentare':
          returnHero.comments = getComments(child.children);
          break;
        case 'sf':
          returnHero.specialAbilities = getSpecialAbilities(child.children);
          break;
        case 'talentliste':
          returnHero.talentList = getTalentList(child.children);
          break;
        case 'vt':
          returnHero.advantages = getAdvantages(child.children);
          break;
        case 'zauberliste':
          returnHero.spellList = getSpellList(child.children);
          break;
        case 'verbindungen':
          returnHero.connections = getConnections(child.children);
          break;
        default:
          returnHero[child.name] = child.children;
          break;
      }
    }
  });
  console.log(returnHero);
  return returnHero;
};

export default index;
