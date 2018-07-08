import trialToProperty from './trialToProperty';

export default (spellList, lcd) => {
  const returnSpellList = {};
  spellList.forEach(s => {
    const {
      name,
      anmerkungen: remarks,
      hauszauber,
      k: complexity,
      kosten: cost,
      reichweite: distance,
      repraesentation: representation,
      variante: variant,
      wirkungsdauer: duration,
      zauberdauer: castTime,
      zauberkommentar: spellComment,
      lernmethode,
      probe,
      value
    } = s.attributes;
    let learningMethode = 'selfStudy';
    switch (lernmethode) {
      case 'Selbststudium':
        learningMethode = 'selfStudy';
        break;
      case 'Gegenseitiges Lehren':
        learningMethode = 'mutualTeaching';
        break;
      default:
        learningMethode = lernmethode;
        break;
    }
    const trial = probe
      .split('(')[1]
      .split(')')[0]
      .split('/');
    returnSpellList[name] = {
      name,
      learningMethode,
      remarks,
      homeSpell: hauszauber === 'true',
      complexity,
      cost,
      distance,
      representation,
      variant,
      duration,
      castTime,
      spellComment,
      trial,
      trialProperties: trial.map(trialToProperty),
      value: parseInt(value, 10)
    };
  });

  // Add properties from LCD to a Spell
  Object.keys(returnSpellList).forEach(name => {
    let spell = returnSpellList[name];
    let possibleSpells = lcd.filter(
      s => s.name.toLowerCase() === name.toLowerCase()
    );
    if (possibleSpells.length > 0) {
      possibleSpells = possibleSpells.map(ps => {
        const returnSpell = ps;
        returnSpell.trial = returnSpell.trial
          .split('(')[0]
          .split(')')[0]
          .split('/');
        return returnSpell;
      });
      spell = { ...spell, ...possibleSpells[0], fromLCD: true };
      returnSpellList[name] = spell;
    }
  });

  return returnSpellList;
};
