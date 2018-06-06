import trialToProperty from './trialToProperty';

export default talentList => {
  const returnTalentList = {};
  talentList.forEach(t => {
    const { name, lernmethode, probe, value } = t.attributes;
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
    returnTalentList[name] = {
      learningMethode,
      trial,
      trialProperties: trial.map(trialToProperty),
      value: parseInt(value, 10)
    };
  });
  return returnTalentList;
};
