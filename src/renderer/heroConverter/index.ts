import { Child, RawEquipemnt, RawHero, RawProperty } from "../types/rawTypes";
import RuleBook from "../Rulebook";
import {
  Comment,
  ConvertedHero,
  Hero,
  HouseRule,
  Vantage,
} from "../types/types";
import addFight from "./addFight";
import getAdvantages from "./getAdvantages";
import getBasics from "./getBasics";
import getComments from "./getComments";
import getConnections from "./getConnections";
import getEquipment from "./getEquipment";
import getEvents from "./getEvents";
import getFight from "./getFight";
import getObjects from "./getObjects";
import getProperties from "./getProperties";
import getPurse from "./getPurse";
import getSpecialAbilities from "./getSpecialAbilities";
import getSpellList from "./getSpellList";
import getTalentList from "./getTalentList";

const getIndex = (children: Child[]) => {
  const nameArray = children.map((child) => child.attributes.name);
  const elem = nameArray.find((e) => e);
  if (elem) {
    return nameArray.indexOf(elem);
  }
  return -1;
};

export const convert = (
  hero: RawHero,
  houseRules: HouseRule[] = []
): ConvertedHero => {
  const returnHero: ConvertedHero = {};
  const ruleBook = new RuleBook(houseRules);
  const index = getIndex(hero.children);
  returnHero.name = hero.children[index].attributes.name;
  const { children } = hero.children[index];
  children.forEach((child) => {
    if (child.children.length > 0) {
      switch (child.name) {
        case "ausrüstungen":
          returnHero.weapons = getEquipment(child.children as RawEquipemnt[]);
          break;
        case "basis":
          returnHero.basics = getBasics(child.children);
          break;
        case "eigenschaften":
          returnHero.properties = getProperties(
            child.children as RawProperty[]
          );
          break;
        case "ereignisse":
          returnHero.events = getEvents(child.children);
          break;
        case "gegenstände":
          returnHero.objects = getObjects(child.children);
          break;
        case "geldboerse":
          returnHero.purse = getPurse(child.children);
          break;
        case "kampf":
          returnHero.fight = getFight(child.children);
          break;
        case "kommentare":
          returnHero.comments = getComments(child.children);
          break;
        case "sf":
          returnHero.specialAbilities = getSpecialAbilities(
            child.children,
            ruleBook.getLiturgium()
          );
          break;
        case "talentliste":
          returnHero.talentList = getTalentList(child.children);
          break;
        case "vt": {
          const vantages = getAdvantages(
            child.children,
            ruleBook.getAdvantages(),
            ruleBook.getDisadvantages()
          );
          returnHero.advantages = vantages.filter(
            (v: Vantage) => v.isAdvantage
          );
          returnHero.disadvantages = vantages.filter(
            (v: Vantage) => !v.isAdvantage
          );
          break;
        }
        case "zauberliste":
          returnHero.spellList = getSpellList(
            child.children,
            ruleBook.getLibreCantionesDeluxe()
          );
          break;
        case "verbindungen":
          returnHero.connections = getConnections(child.children);
          break;
        default:
          returnHero[child.name] = child.children;
          break;
      }
    }
  });
  if (returnHero.talentList && returnHero.fight) {
    returnHero.talentList = addFight(returnHero.talentList, returnHero.fight);
  }
  return returnHero;
};

export const reconvert = (chosenHero: Hero) => {
  const returnXml = { ...chosenHero.xml };
  let { children } = returnXml.children[0];
  children = children.map((child) => {
    const returnChild = child;
    if (returnChild.children.length > 0) {
      switch (returnChild.name) {
        case "ausrüstungen":
          // returnHero.weapons = getEquipment(child.children);
          break;
        case "basis": {
          const { basics } = chosenHero.converted;
          if (basics && basics.notes) {
            returnChild.children[6].attributes.notiz0 = basics.notes.join(
              "&#10;"
            );
          }
          // returnHero.basics = getBasics(child.children);
          break;
        }
        case "eigenschaften":
          // returnHero.properties = getProperties(child.children);
          break;
        case "ereignisse":
          // returnHero.events = getEvents(child.children);
          break;
        case "gegenstände":
          {
            let existingObjects = returnChild.children.map(
              (o) => o.attributes.name
            );
            const { objects } = chosenHero.converted;
            if (objects) {
              Object.keys(objects).forEach((name: string) => {
                const object = objects[name];
                if (existingObjects.indexOf(name) > -1) {
                  returnChild.children = returnChild.children
                    .map((o) => {
                      const returnObject = o;
                      if (returnObject.attributes.name === name) {
                        if (object.amount === 0) {
                          return undefined;
                        }
                        returnObject.attributes.anzahl = object.amount;
                      }
                      existingObjects = existingObjects.filter(
                        (eo) => eo !== name
                      );
                      return returnObject;
                    })
                    .filter(
                      (e: Child | undefined): e is Child => e !== undefined
                    );
                } else {
                  returnChild.children.push({
                    attributes: {
                      anzahl: object.amount,
                      name,
                      slot: "0",
                    },
                    children: [],
                    name: "gegenstand",
                    parent: null,
                    type: "element",
                    value: "",
                  });
                }
              });
            }

            returnChild.children = returnChild.children.filter(
              (o) => o && existingObjects.indexOf(o.attributes.name) === -1
            );
          }
          // returnHero.objects = getObjects(child.children);
          break;
        case "geldboerse": {
          const { purse } = chosenHero.converted;
          if (purse) {
            Object.keys(purse).forEach((monetaryUnit) => {
              const money = purse[monetaryUnit];
              returnChild.children = returnChild.children.map((m) => {
                const returnMoney = m;
                if (returnMoney.attributes.name === monetaryUnit) {
                  returnMoney.attributes.anzahl = money.amount;
                }
                return returnMoney;
              });
            });
          }
          // returnHero.purse = getPurse(child.children);
          break;
        }

        case "kampf":
          // returnHero.fight = getFight(child.children);
          break;
        case "kommentare": {
          const { comments } = chosenHero.converted;
          if (comments) {
            comments
              .filter((c: Comment) => c.added)
              .forEach((commentToAdd: Comment) => {
                returnChild.children.push({
                  attributes: {
                    key: commentToAdd.name,
                    kommentar: commentToAdd.comment,
                    added: true,
                    id: commentToAdd.id,
                  },
                  children: [],
                  name: "kommentar",
                  parent: null,
                  type: "element",
                  value: "",
                });
              });
            // returnHero.comments = getComments(child.children);
          }
          break;
        }

        case "sf":
          // returnHero.specialAbilities = getSpecialAbilities(child.children);
          break;
        case "talentliste":
          // returnHero.talentList = getTalentList(child.children);
          break;
        case "vt": {
          // const vantages = getAdvantages(
          //   child.children,
          //   ruleBook.getAdvantages(),
          //   ruleBook.getDisadvantages()
          // );
          // returnHero.advantages = vantages.filter(v => v.isAdvantage);
          // returnHero.disadvantages = vantages.filter(v => !v.isAdvantage);
          break;
        }
        case "zauberliste":
          // returnHero.spellList = getSpellList(
          //   child.children,
          //   ruleBook.getLibreCantionesDeluxe()
          // );
          break;
        case "verbindungen":
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
