export default purse => {
  const returnPurse = {};
  purse.forEach(money => {
    const { anzahl, name, waehrung: country } = money.attributes;
    returnPurse[name] = {
      amount: parseInt(anzahl, 10),
      country
    };
  });
  return returnPurse;
};
