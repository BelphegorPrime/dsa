import lcd from './libreCantionesDeluxe.json';

export default class Rulebook {
  /**
   * TODO: export a downloadable File with a template for houserules
   */
  constructor(houseRules) {
    this.houseRules = houseRules;
  }

  getLibreCantionesDeluxe() {
    const spellRules = this.houseRules.filter(rule => rule.type === 'spell');
    const lcdInstance = JSON.parse(JSON.stringify(lcd));
    spellRules.forEach(rule => {
      const possibleSpells = lcdInstance.filter(
        s => s.page === rule.page || s.name === rule.name
      );
      if (possibleSpells.length > 0) {
        const [spell] = possibleSpells;
        rule.additionalModification.forEach(variant => {
          const otherVariants = spell.variants.filter(
            v => v.name !== variant.name
          );
          otherVariants.push(variant);
          spell.variants = otherVariants;
        });
      }
    });
    return lcdInstance;
  }
}
