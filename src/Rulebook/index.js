import lcd from './libreCantionesDeluxe.json';

export default class Rulebook {
  /**
   * TODO: export a downloadable File with a template for houserules
   */
  constructor(houseRules) {
    console.log('Rulebook created');
    this.houseRules = houseRules;
    console.log(this.houseRules);
  }

  static getLibreCantionesDeluxe() {
    return lcd;
  }
}
