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
import addFight from './addFight';
import RuleBook from '../Rulebook';

export const convert = (hero, houseRules = []) => {
  const returnHero = {};
  const ruleBook = new RuleBook(houseRules);
  console.log(ruleBook.getArsenal());
  returnHero.name = hero.children[0].attributes.name;
  const { children } = hero.children[0];
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
        case 'vt': {
          const vantages = getAdvantages(
            child.children,
            ruleBook.getAdvantages(),
            ruleBook.getDisadvantages()
          );
          returnHero.advantages = vantages.filter(v => v.isAdvantage);
          returnHero.disadvantages = vantages.filter(v => !v.isAdvantage);
          break;
        }
        case 'zauberliste':
          returnHero.spellList = getSpellList(
            child.children,
            ruleBook.getLibreCantionesDeluxe()
          );
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
  returnHero.talentList = addFight(returnHero.talentList, returnHero.fight);
  console.log(returnHero);
  return returnHero;
};

export const reconvert = chosenHero => {
  const returnXml = Object.assign({}, chosenHero.xml);
  let { children } = returnXml.children[0];
  children = children.map(child => {
    const returnChild = child;
    if (returnChild.children.length > 0) {
      switch (returnChild.name) {
        case 'ausrüstungen':
          // returnHero.weapons = getEquipment(child.children);
          break;
        case 'basis':
          returnChild.children[6].attributes.notiz0 = chosenHero.converted.basics.notes.join(
            '&#10;'
          );
          // returnHero.basics = getBasics(child.children);
          break;
        case 'eigenschaften':
          // returnHero.properties = getProperties(child.children);
          break;
        case 'ereignisse':
          // returnHero.events = getEvents(child.children);
          break;
        case 'gegenstände':
          // returnHero.objects = getObjects(child.children);
          break;
        case 'geldboerse':
          Object.keys(chosenHero.converted.purse).forEach(monetaryUnit => {
            const money = chosenHero.converted.purse[monetaryUnit];
            returnChild.children = returnChild.children.map(m => {
              const returnMoney = m;
              if (returnMoney.attributes.name === monetaryUnit) {
                returnMoney.attributes.anzahl = money.amount;
              }
              return returnMoney;
            });
          });
          // returnHero.purse = getPurse(child.children);
          break;
        case 'kampf':
          // returnHero.fight = getFight(child.children);
          break;
        case 'kommentare':
          chosenHero.converted.comments
            .filter(c => c.added)
            .forEach(commentToAdd => {
              returnChild.children.push({
                attributes: {
                  key: commentToAdd.name,
                  kommentar: commentToAdd.comment,
                  added: true,
                  id: commentToAdd.id
                },
                children: [],
                name: 'kommentar',
                parent: null,
                type: 'element',
                value: ''
              });
            });
          // returnHero.comments = getComments(child.children);
          break;
        case 'sf':
          // returnHero.specialAbilities = getSpecialAbilities(child.children);
          break;
        case 'talentliste':
          // returnHero.talentList = getTalentList(child.children);
          break;
        case 'vt': {
          // const vantages = getAdvantages(
          //   child.children,
          //   ruleBook.getAdvantages(),
          //   ruleBook.getDisadvantages()
          // );
          // returnHero.advantages = vantages.filter(v => v.isAdvantage);
          // returnHero.disadvantages = vantages.filter(v => !v.isAdvantage);
          break;
        }
        case 'zauberliste':
          // returnHero.spellList = getSpellList(
          //   child.children,
          //   ruleBook.getLibreCantionesDeluxe()
          // );
          break;
        case 'verbindungen':
          // returnHero.connections = getConnections(child.children);
          break;
        default:
          // returnHero[child.name] = child.children;
          break;
      }
    }
    return returnChild;
  });
  returnXml.children[0].children = children;
  return returnXml;
};
