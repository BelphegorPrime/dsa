const getPosition = name => {
  switch (name) {
    case 'Dukat':
      return 1;
    case 'Silbertaler':
      return 2;
    case 'Kreuzer':
      return 3;
    default:
      return 0;
  }
};

export default purse => {
  const returnPurse = {};
  purse.forEach(money => {
    const { anzahl, name, waehrung: country } = money.attributes;
    returnPurse[name] = {
      amount: parseInt(anzahl, 10),
      country,
      name,
      position: getPosition(name)
    };
  });
  return returnPurse;
};
