import trialToProperty from './trialToProperty';

export default comments =>
  comments.map(c => {
    const {
      key,
      kommentar: comment,
      dauer: duration,
      kosten: cost,
      probe,
      sf: specialAbility,
      sfname: specialAbilityName,
      wirkung: effect
    } = c.attributes;
    const trial =
      probe && probe !== ''
        ? probe
            .split('(')[1]
            .split(')')[0]
            .split('/')
        : [];
    if (!key) {
      return {
        duration,
        cost,
        trial,
        trialProperties: trial.map(trialToProperty),
        specialAbility,
        specialAbilityName,
        effect
      };
    }
    return {
      name: key,
      comment
    };
  });
