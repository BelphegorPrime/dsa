import { Child } from "../rawTypes";
import { Fight } from "../types";

export default (fight: Child[]) => {
  const returnFight: Fight = {};
  fight.forEach(f => {
    const { name } = f.attributes;
    const [first, second] = f.children;
    if (name) {
      returnFight[name] = {
        attack: first.attributes.value
          ? parseInt(first.attributes.value, 10)
          : 0,
        parade: second.attributes.value
          ? parseInt(second.attributes.value, 10)
          : 0
      };
    }
  });
  return returnFight;
};
