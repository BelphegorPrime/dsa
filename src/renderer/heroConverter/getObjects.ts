import { Child, RawProperty } from "../rawTypes";
import { ObjectType } from "../types";
import getProperties from "./getProperties";

export default (objects: Child[]) => {
  const returnObject: ObjectType = {};
  objects.forEach(o => {
    const { name, anzahl, slot } = o.attributes;
    if (name) {
      if (o.children.length > 0) {
        const slotNumber = slot ? parseInt(slot, 10) : 0;
        const amountNumber = anzahl ? anzahl : 0;
        returnObject[name] = {
          slot: slotNumber,
          amount: amountNumber
        };
        o.children.forEach(c => {
          switch (c.name) {
            case "Fernkampfwaffe":
              returnObject[name].distantWeapon = true;
              returnObject[name].talent = c.children[0].attributes.kampftalent;
              break;
            case "modallgemein": {
              const v0 = c.children[0].attributes.value;
              const v1 = c.children[1].attributes.value;
              returnObject[name].weight = v0 ? parseInt(v0, 10) : 0;
              returnObject[name].price = v1 ? parseInt(v1, 10) : 0;
              returnObject[name].name = c.children[2].attributes.value;
              break;
            }
            case "Wesen":
              returnObject[name].properties = getProperties(c.children[0]
                .children as RawProperty[]);
              break;
            default:
              break;
          }
        });
      } else {
        const slotNumber = slot ? parseInt(slot, 10) : 0;
        const amountNumber = anzahl ? anzahl : 0;
        returnObject[name] = {
          slot: slotNumber,
          amount: amountNumber
        };
      }
    }
  });
  return returnObject;
};
