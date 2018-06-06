export default advantages =>
  advantages.map(
    a =>
      a.attributes.value
        ? {
            name: a.attributes.name,
            value: parseInt(a.attributes.value, 10)
          }
        : {
            name: a.attributes.name
          }
  );
