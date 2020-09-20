import { Child } from "../types/rawTypes";
import { Vantage } from "../types/types";

export default (
  values: Child[],
  advantages: string[],
  disadvantages: string[]
): Vantage[] =>
  values
    .map((a: Child): Vantage | undefined => {
      const adittionalValues = a.children.map((e) => e.attributes.value);
      const { name } = a.attributes;
      if (name) {
        let isAdvantage = null;
        if (advantages.indexOf(name) > -1) {
          isAdvantage = true;
        }
        if (disadvantages.indexOf(name) > -1) {
          isAdvantage = false;
        }
        if (a.attributes.value) {
          let value: number | string = parseInt(a.attributes.value, 10);
          value = value ? value : a.attributes.value;
          return {
            name,
            value,
            isAdvantage,
          };
        }
        if (adittionalValues.length > 0) {
          return {
            name,
            value: `${adittionalValues[1]} ${adittionalValues[0]}`,
            isAdvantage,
          };
        }
        return {
          name,
          isAdvantage,
        };
      }
      return undefined;
    })
    .filter((v: Vantage | undefined): v is Vantage => v !== undefined);
