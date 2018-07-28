export default (values, advantages, disadvantages) =>
  values.map(a => {
    const adittionalValues = a.children.map(e => e.attributes.value);
    const { name } = a.attributes;
    let isAdvantage = null;
    if (advantages.indexOf(name) > -1) {
      isAdvantage = true;
    }
    if (disadvantages.indexOf(name) > -1) {
      isAdvantage = false;
    }
    if (a.attributes.value) {
      const value = parseInt(a.attributes.value, 10);
      return {
        name,
        value: value || a.attributes.value,
        isAdvantage
      };
    }
    if (adittionalValues.length > 0) {
      return {
        name,
        value: `${adittionalValues[1]} ${adittionalValues[0]}`,
        isAdvantage
      };
    }
    return {
      name,
      isAdvantage
    };
  });
