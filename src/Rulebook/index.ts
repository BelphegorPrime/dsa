import { HouseRule, Liturgie, Spell, Weapon } from "../types";
import advantages from "./advantages.json";
import arsenal from "./arsenal.json";
import disadvantages from "./disadvantages.json";
import liberLiturgium from "./liberLiturgium.json";
import lcd from "./libreCantionesDeluxe.json";

export default class Rulebook {
  public houseRules: HouseRule[];
  constructor(houseRules: HouseRule[]) {
    this.houseRules = houseRules;
  }

  public getLibreCantionesDeluxe() {
    const spellRules = this.houseRules.filter(rule => rule.type === "spell");
    const lcdInstance: Spell[] = JSON.parse(JSON.stringify(lcd));
    spellRules.forEach(rule => {
      const spell = lcdInstance.find(
        (s: Spell) => s.page === rule.page || s.name === rule.name
      );
      if (spell) {
        rule.additionalModification.forEach(variant => {
          if (spell.variants) {
            const otherVariants = spell.variants.filter(
              v => v.name !== variant.name
            );
            otherVariants.push(variant);
            spell.variants = otherVariants;
          }
        });
      }
    });
    return lcdInstance;
  }

  public getArsenal() {
    const weaponRules = this.houseRules.filter(rule => rule.type === "weapon");
    let arsenalInstance: Weapon[] = JSON.parse(JSON.stringify(arsenal));
    weaponRules.forEach(rule => {
      arsenalInstance = arsenalInstance.filter(w => w.name !== rule.name);
      arsenalInstance.push(rule);
    });
    return arsenalInstance;
  }

  public getAdvantages(): string[] {
    return advantages;
  }

  public getDisadvantages(): string[] {
    return disadvantages;
  }

  public getLiturgium() {
    const liberLiturgiumInstance: Liturgie[] = JSON.parse(
      JSON.stringify(liberLiturgium)
    );
    return liberLiturgiumInstance;
  }

  public getZooBotanica() {
    return [];
  }

  public getElementals() {
    return [];
  }
}
