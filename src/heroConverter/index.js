import getBasics from './getBasics';
import getProperties from './getProperties';

const getEquipment = equipments => {
  console.log(equipments);
  return equipments;
};

const getEvents = events => {
  console.log(events);
  return events;
};

const getObjects = objects => {
  console.log(objects);
  return objects;
};

const getPurse = purse => {
  console.log(purse);
  return purse;
};

const getFight = fight => {
  console.log(fight);
  return fight;
};

const getComments = comments => {
  console.log(comments);
  return comments;
};

const getSpecialAbilities = specialAbilities => {
  console.log(specialAbilities);
  return specialAbilities;
};

const getTalentList = talentList => {
  console.log(talentList);
  return talentList;
};

const getAdvantages = advantages => {
  console.log(advantages);
  return advantages;
};

const getSpellList = spellList => {
  console.log(spellList);
  return spellList;
};

const index = hero => {
  const returnHero = {};
  returnHero.name = hero.children[0].attributes.name;
  const { children } = hero.children[0];
  children.forEach(child => {
    if (child.children.length > 0) {
      switch (child.name) {
        case 'ausrüstungen':
          returnHero.equipments = getEquipment(child.children);
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
