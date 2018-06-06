export default fight => {
  const returnFight = {};
  fight.forEach(f => {
    returnFight[f.attributes.name] = {
      attack: f.children[0].attributes.value
        ? parseInt(f.children[0].attributes.value, 10)
        : 0,
      parade: f.children[1].attributes.value
        ? parseInt(f.children[1].attributes.value, 10)
        : 0
    };
  });
  return returnFight;
};
