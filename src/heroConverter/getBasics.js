export default basics => {
  const returnBasics = {};
  returnBasics.gender =
    basics[0].attributes.name === 'männlich' ? 'male' : 'female';
  returnBasics.playAids = basics[1].children.map(c => c.attributes.name);
  returnBasics.race = basics[2].attributes.string;
  returnBasics.size = parseInt(basics[2].children[0].attributes.value, 10);
  returnBasics.mass = parseInt(basics[2].children[0].attributes.gewicht, 10);
  returnBasics.age = parseInt(basics[2].children[1].attributes.alter, 10);
  returnBasics.eyeColor = basics[2].children[1].attributes.augenfarbe;
  returnBasics.hairColor = basics[2].children[1].attributes.haarfarbe;
  returnBasics.calendar = basics[2].children[1].attributes.kalender;
  const { gbtag, gbmonat, gbjahr } = basics[2].children[1].attributes;
  returnBasics.birthDate = `${gbtag}.${gbmonat}.${gbjahr}`;
  returnBasics.startGeneratingPoints = parseInt(
    basics[2].children[1].attributes.gpstart,
    10
  );
  returnBasics.culture = basics[3].attributes.string;
  const {
    art: kind,
    string: name,
    tarnidentitaet: coverIdentity
  } = basics[4].children[0].attributes;
  const variant = basics[4].children[0].children[0].attributes.name;
  returnBasics.profession = {
    kind,
    name,
    coverIdentity,
    variant
  };
  returnBasics.notes = Object.keys(basics[6].attributes)
    .map(key =>
      basics[6].attributes[key] !== ''
        ? basics[6].attributes[key].split('&#10;')
        : null
    )
    .filter(e => e)
    .reduce((flat, toFlatten) => flat.concat(toFlatten), [])
    .filter(e => e !== 'Notizen');
  returnBasics.exp = parseInt(basics[8].attributes.value, 10);
  returnBasics.freeExp = parseInt(basics[9].attributes.value, 10);
  return returnBasics;
};
