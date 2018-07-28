import getProperties from './getProperties';

export default objects => {
  const returnObject = {};
  objects.forEach(o => {
    const { name, anzahl, slot } = o.attributes;
    if (o.children.length > 0) {
      returnObject[name] = {
        slot: parseInt(slot, 10),
        amount: parseInt(anzahl, 10)
      };
      o.children.forEach(c => {
        switch (c.name) {
          case 'Fernkampfwaffe':
            returnObject[name].distantWeapon = true;
            returnObject[name].talent = c.children[0].attributes.kampftalent;
            break;
          case 'modallgemein':
            returnObject[name].weight = parseInt(
              c.children[0].attributes.value,
              10
            );
            returnObject[name].price = parseInt(
              c.children[1].attributes.value,
              10
            );
            returnObject[name].name = c.children[2].attributes.value;
            break;
          case 'Wesen':
            returnObject[name].properties = getProperties(
              c.children[0].children
            );
            break;
          default:
            break;
        }
      });
    } else {
      returnObject[name] = {
        slot: parseInt(slot, 10),
        amount: parseInt(anzahl, 10)
      };
    }
  });
  return returnObject;
};