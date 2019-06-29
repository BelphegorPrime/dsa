import { Child, Purse } from "../types";

const getPosition = (name: string): number => {
  switch (name) {
    case "Dukat":
      return 1;
    case "Silbertaler":
      return 2;
    case "Heller":
      return 3;
    case "Kreuzer":
      return 4;
    default:
      return 0;
  }
};

export default (purse: Child[]) => {
  const returnPurse: Purse = {};
  purse.forEach(money => {
    const { anzahl, name, waehrung } = money.attributes;
    if (name) {
      const amount = anzahl ? anzahl : 0;
      const country = waehrung ? waehrung : "";
      returnPurse[name] = {
        amount,
        country,
        name,
        position: getPosition(name)
      };
    }
  });
  return returnPurse;
};
