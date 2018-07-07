const houseRule = {
  type: 'spell',
  // page within the LCD
  page: 23,
  name: 'Ängste Lindern',
  additionalModification: [
    {
      name: 'Panik beruhigen',
      mod: '+7',
      minZfW: 10,
      effect: 'Panische Person wird ruhiger'
    }
  ],
  getType: () => houseRule.type
};
houseRule;
