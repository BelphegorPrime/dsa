export default specialAbilities => {
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
