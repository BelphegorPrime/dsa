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
    let trial = [];
    if (probe && probe !== '') {
      let split1 = probe;
      if (probe.indexOf('(') > -1) {
        [, split1] = probe.split('(');
      }
      trial = split1.split(')')[0].split('/');
    }
    if (!key) {
      return {
        duration,
        cost,
        trial: trial.map(t => t.split(' ').join('')),
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
