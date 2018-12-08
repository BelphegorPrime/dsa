import React from 'react';
import proptypes from 'prop-types';

const DownloadableTemplates = React.lazy(() => import('./DownloadableTemplates'));

const HouseRules = props => {
  const { houseRules, houseRuleToShow, removeRule } = props;
  if (houseRuleToShow === 'templates') {
    return <DownloadableTemplates />;
  }
  const rulesToShow = houseRules.filter(hr => hr.type === houseRuleToShow);
  return rulesToShow.map((rule, index) => {
    switch (rule.type) {
      case 'spell': {
        return (
          <div key={rule.type + rule.name + index} className="col-md-4">
            <div className="m-2 p-2 border position-relative">
              <div
                className="house-rule-delete position-absolute col-md-2 btn btn-secondary"
                onClick={() => removeRule(rule.id)}>
                X
              </div>
              <div>Typ: Zauber</div>
              <div>
                Name: <span className="font-weight-bold">{rule.name}</span>
              </div>
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
      case 'weapon': {
        return (
          <div key={rule.type + rule.name + index} className="col-md-4">
            <div className="m-2 p-2 border position-relative">
              <div
                className="house-rule-delete position-absolute col-md-2 btn btn-secondary"
                onClick={() => removeRule(rule.id)}>
                X
              </div>
              <div>Typ: Waffe</div>
              <div>
                Name: <span className="font-weight-bold">{rule.name}</span>
              </div>
              <div>TP: {rule.TP}</div>
              <div>TP/KK: {rule['TP/KK']}</div>
              <div>Gewicht: {rule.mass}</div>
              <div>Länge: {rule.length}</div>
              <div>Bruchfaktor: {rule.BF}</div>
              <div>Initiativmodifikator: {rule.INI}</div>
              <div>Preis: {rule.cost}</div>
              <div>WM: {rule.WM}</div>
              <div>Kommentar: {rule.comment}</div>
              <div>DK: {rule.DK}</div>
              <div>Talent: {rule.talent}</div>
              <div>Verbreitung: {rule.distribution}</div>
            </div>
          </div>
        );
      }
      default: {
        return null;
      }
    }
  });
};

HouseRules.propTypes = {
  houseRuleToShow: proptypes.string,
  houseRules: proptypes.array,
  removeRule: proptypes.func
};

export default HouseRules;
