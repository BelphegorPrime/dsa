import { Child } from "../types/rawTypes";
import { TalentList } from "../types/types";
import trialToProperty from "./trialToProperty";

export default (talentList: Child[]): TalentList => {
  const returnTalentList: TalentList = {};
  talentList.forEach((t) => {
    const { name, lernmethode, probe, value } = t.attributes;
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
      const trial = probe.split("(")[1].split(")")[0].split("/");

      if (t.attributes.k) {
        returnTalentList[name] = {
          learningMethode,
          trial,
          trialProperties: trial.map(trialToProperty),
          value: value ? value : "0",
          k: t.attributes.k,
        };
      } else {
        returnTalentList[name] = {
          learningMethode,
          trial,
          trialProperties: trial.map(trialToProperty),
          value: value ? value : "0",
        };
      }
    }
  });
  return returnTalentList;
};
