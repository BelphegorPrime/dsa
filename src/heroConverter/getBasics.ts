import { Child } from "../rawTypes";
import { Basic } from "../types";

export default (basics: Child[]): Basic => {
  const returnBasics: Basic = {};
  returnBasics.gender =
    basics[0].attributes.name === "männlich" ? "male" : "female";
  returnBasics.playAids = basics[1].children
    .map(c => c.attributes.name)
    .filter((e: string | undefined): e is string => e !== undefined);
  returnBasics.race = basics[2].attributes.string;
  const [first, second] = basics[2].children;
  if (first.attributes.value) {
    returnBasics.size = parseInt(first.attributes.value, 10);
  }
  if (first.attributes.gewicht) {
    returnBasics.mass = parseInt(first.attributes.gewicht, 10);
  }
  if (second.attributes.alter) {
    returnBasics.age = parseInt(second.attributes.alter, 10);
  }
  returnBasics.eyeColor = second.attributes.augenfarbe;
  returnBasics.hairColor = second.attributes.haarfarbe;
  returnBasics.calendar = second.attributes.kalender;
  const { gbtag, gbmonat, gbjahr } = second.attributes;
  returnBasics.birthDate = `${gbtag}.${gbmonat}.${gbjahr}`;

  if (second.attributes.gpstart) {
    returnBasics.startGeneratingPoints = parseInt(
      second.attributes.gpstart,
      10
    );
  }
  returnBasics.culture = basics[3].attributes.string;
  const {
    art: kind,
    string: name,
    tarnidentitaet: coverIdentity
  } = basics[4].children[0].attributes;
  const variant = basics[4].children[0].children[0].attributes.name;
  returnBasics.profession = {
    kind,
    name,
    coverIdentity,
    variant
  };
  if (basics[6].attributes) {
    const { attributes } = basics[6];
    returnBasics.notes = Object.keys(attributes)
      .map(key => {
        let value = attributes[key];
        if (value && value !== "") {
          value = value.toString();
          return value.split("&#10;");
        }
        return undefined;
      })
      .filter((e: string[] | undefined): e is string[] => e !== undefined)
      .reduce((flat, toFlatten) => flat.concat(toFlatten), [])
      .filter((e: string) => e !== "Notizen");
  }
  if (basics[8].attributes.value) {
    returnBasics.exp = parseInt(basics[8].attributes.value, 10);
  }
  if (basics[9].attributes.value) {
    returnBasics.freeExp = parseInt(basics[9].attributes.value, 10);
  }
  return returnBasics;
};
