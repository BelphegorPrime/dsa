const houseRule = {
  type: 'spell',
  // name of the Spell REQUIRED!!
  name: 'Ängste Lindern',
  // page within the LCD
  page: 23,
  additionalModification: [
    {
      name: 'Panik beruhigen',
      mod: '+7',
      minZfW: 10,
      effect: 'Panische Person wird ruhiger'
    }
  ]
};
houseRule;
