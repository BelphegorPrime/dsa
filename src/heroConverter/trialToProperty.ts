export default (propertyString: string): string | null => {
  switch (propertyString.split(" ").join("")) {
    case "MU":
      return "courage";
    case "KL":
      return "wisdom";
    case "IN":
      return "intuition";
    case "CH":
      return "charisma";
    case "FF":
      return "fingerAbility";
    case "GE":
      return "dexterity";
    case "KO":
      return "constitution";
    case "KK":
      return "strength";
    default:
      return null;
  }
};
