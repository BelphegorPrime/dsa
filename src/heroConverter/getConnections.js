export default connections =>
  connections.map(e => ({
    name: e.attributes.name,
    description: e.attributes.beschreibung,
    socialStatus: e.attributes.so
  }));
