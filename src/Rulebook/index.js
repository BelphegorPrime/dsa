import lcd from './libreCantionesDeluxe.json';
import arsenal from './arsenal.json';
import advantages from './advantages.json';
import disadvantages from './disadvantages.json';

export default class Rulebook {
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

  getArsenal() {
    const weaponRules = this.houseRules.filter(rule => rule.type === 'weapon');
    let arsenalInstance = JSON.parse(JSON.stringify(arsenal));
    weaponRules.forEach(rule => {
      arsenalInstance = arsenalInstance.filter(w => w.name !== rule.name);
      arsenalInstance.push(rule);
    });
    return arsenalInstance;
  }

  getAdvantages() {
    return advantages;
  }

  getDisadvantages() {
    return disadvantages;
  }

  getLiturgium() {
    return [];
  }

  getZooBotanica() {
    return [];
  }

  getElementals() {
    return [];
  }
}
