import { Child } from "../rawTypes";
import { Spell, SpellList } from "../types";
import trialToProperty from "./trialToProperty";

export default (spellList: Child[], lcd: Spell[]): SpellList => {
  const returnSpellList: SpellList = {};
  spellList.forEach((s: Child) => {
    const {
      name,
      anmerkungen: remarks,
      hauszauber,
      k: complexity,
      kosten: cost,
      reichweite: distance,
      repraesentation: representation,
      variante: variant,
      wirkungsdauer: duration,
      zauberdauer: castTime,
      zauberkommentar: spellComment,
      lernmethode,
      probe,
      value
    } = s.attributes;
    if (name && probe) {
      let learningMethode = "selfStudy";
      switch (lernmethode) {
        case "Selbststudium":
          learningMethode = "selfStudy";
          break;
        case "Gegenseitiges Lehren":
          learningMethode = "mutualTeaching";
          break;
        default:
          if (lernmethode) {
            learningMethode = lernmethode;
          }
          break;
      }
      const trial = probe
        .split("(")[1]
        .split(")")[0]
        .split("/");

      returnSpellList[name] = {
        name,
        learningMethode,
        remarks: remarks ? remarks : "",
        homeSpell: hauszauber === "true",
        complexity: complexity ? complexity : "",
        cost: cost ? cost : "",
        distance: distance ? distance : "",
        representation: representation ? representation : "",
        variant: variant ? variant : "",
        duration: duration ? duration : "",
        castTime: castTime ? castTime : "",
        spellComment: spellComment ? spellComment : "",
        trial,
        trialProperties: trial.map(trialToProperty),
        value: value ? parseInt(value, 10) : 0
      };
    }
  });

  // Add properties from LCD to a Spell
  Object.keys(returnSpellList).forEach(name => {
    let spell = returnSpellList[name];
    let possibleSpells = lcd.filter(
      s => s.name.toLowerCase() === name.toLowerCase()
    );
    if (possibleSpells.length > 0) {
      possibleSpells = possibleSpells.map(ps => {
        const returnSpell = ps;
        const trial: string = returnSpell.trial as string;
        returnSpell.trial = trial
          .split("(")[0]
          .split(")")[0]
          .split("/");
        return returnSpell;
      });
      spell = { ...spell, ...possibleSpells[0], fromLCD: true };
      returnSpellList[name] = spell;
    }
  });

  return returnSpellList;
};
