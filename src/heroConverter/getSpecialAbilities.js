const namesToPage = liberLiturgium => {
  const returnValue = {};
  liberLiturgium.forEach(liturgy => {
    returnValue[liturgy.name] = liturgy.page;
    if (liturgy.alternativeNames) {
      liturgy.alternativeNames.forEach(alternateName => {
        returnValue[alternateName.name] = liturgy.page;
      });
    }
  });
  return returnValue;
};

export default (specialAbilities, liberLiturgium) => {
  const namePages = namesToPage(liberLiturgium);
  const filteredSpecialAbilities = specialAbilities.filter(
    s => s.name === 'sonderfertigkeit'
  );
  const filteredCheapenedSpecialAbilities = specialAbilities.filter(
    s => s.name === 'verbilligtesonderfertigkeit'
  );
  return {
    specialAbilities: filteredSpecialAbilities.map(sa => {
      if (sa.attributes.name.indexOf('Wahrer Name: ') > -1) {
        return {
          name: sa.attributes.name,
          values: sa.children.map(trueName =>
            trueName.children.map(e => e.attributes.value).join(' ')
          )
        };
      }
      if (sa.attributes.name.indexOf('Liturgie:') > -1) {
        const liturgyName = Object.keys(namePages).find(
          name => sa.attributes.name.indexOf(name) > -1
        );
        if (liturgyName) {
          const page = namePages[liturgyName];
          const liturgy = liberLiturgium.find(ll => ll.page === page);
          return {
            name: sa.attributes.name,
            liturgy
          };
        }
      }
      if (sa.children.length > 0) {
        return {
          name: sa.attributes.name,
          values: sa.children.map(c => c.attributes.name)
        };
      }
      return {
        name: sa.attributes.name
      };
    }),
    cheapenedSpecialAbilities: filteredCheapenedSpecialAbilities.map(csa => ({
      name: csa.attributes.name
    }))
  };
};
