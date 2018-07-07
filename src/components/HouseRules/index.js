import React, { Component } from 'react';
import proptypes from 'prop-types';

class HouseRules extends Component {
  removeRule(rule) {
    this.props.removeRule(rule.id);
  }

  render() {
    const { houseRules, houseRuleToShow } = this.props;
    const rulesToShow = houseRules.filter(hr => hr.type === houseRuleToShow);
    return rulesToShow.map((rule, index) => {
      if (rule.type === 'spell') {
        return (
          <div key={rule.type + rule.name + index} className="col-md-4">
            <div className="m-3 p-3 border position-relative">
              <div
                className="house-rule-delete position-absolute col-md-2 btn btn-secondary"
                onClick={this.removeRule.bind(this, rule)}>
                X
              </div>
              <div>Typ: Zauber</div>
              <div>Zaubername: {rule.name}</div>
              <div>LCD Seite: {rule.page}</div>
              <div>
                zusätzliche Modifikationen:{' '}
                {rule.additionalModification.map(mod => (
                  <div className="pl-3" key={mod.name + mod.effect}>
                    <div>Name: {mod.name}</div>
                    <div>Modifikation: {mod.mod}</div>
                    <div>Min. ZfW: {mod.minZfW}</div>
                    <div>Wirkung: {mod.effect}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
      return null;
    });
  }
}

HouseRules.propTypes = {
  houseRuleToShow: proptypes.string,
  houseRules: proptypes.array,
  removeRule: proptypes.func
};

export default HouseRules;
