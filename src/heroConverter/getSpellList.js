import trialToProperty from './trialToProperty';

export default spellList => {
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
      default:
        learningMethode = lernmethode;
        break;
    }
    const trial = probe
      .split('(')[1]
      .split(')')[0]
      .split('/');
    returnSpellList[name] = {
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
  return returnSpellList;
};
