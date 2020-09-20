import { Child } from "../types/rawTypes";
import { Liturgie, SpecialAbilities } from "../types/types";

interface LiturgieObject {
  [namse: string]: number;
}

const namesToPage = (liberLiturgium: Liturgie[]) => {
  const returnValue: LiturgieObject = {};
  liberLiturgium.forEach((liturgy) => {
    returnValue[liturgy.name] = liturgy.page;
    if (liturgy.alternativeNames) {
      liturgy.alternativeNames.forEach((alternateName) => {
        returnValue[alternateName.name] = liturgy.page;
      });
    }
  });
  return returnValue;
};

export default (
  specialAbilities: Child[],
  liberLiturgium: Liturgie[]
): SpecialAbilities => {
  const namePages = namesToPage(liberLiturgium);
  const filteredSpecialAbilities = specialAbilities.filter(
    (s) => s.name === "sonderfertigkeit"
  );
  const filteredCheapenedSpecialAbilities = specialAbilities.filter(
    (s) => s.name === "verbilligtesonderfertigkeit"
  );
  return {
    specialAbilities: filteredSpecialAbilities.map((sa) => {
      let { name } = sa.attributes;
      name = name ? name : "";
      if (name.indexOf("Wahrer Name: ") > -1) {
        return {
          name,
          values: sa.children.map((trueName) =>
            trueName.children.map((e) => e.attributes.value).join(" ")
          ),
        };
      }
      if (name.indexOf("Liturgie:") > -1) {
        const liturgyName = Object.keys(namePages).find(
          (n) => name && name.indexOf(n) > -1
        );
        if (liturgyName) {
          const page = namePages[liturgyName];
          const liturgy = liberLiturgium.find((ll) => ll.page === page);
          return {
            name,
            liturgy,
          };
        }
      }
      if (sa.children.length > 0) {
        return {
          name,
          values: sa.children.map((c: Child): string => {
            let cName = c.attributes.name;
            cName = cName ? cName : "";
            return cName;
          }),
        };
      }
      return {
        name,
      };
    }),
    cheapenedSpecialAbilities: filteredCheapenedSpecialAbilities.map((csa) => {
      let { name } = csa.attributes;
      name = name ? name : "";
      return {
        name,
      };
    }),
  };
};
