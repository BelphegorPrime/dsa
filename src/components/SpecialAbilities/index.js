import React, { Component } from 'react';
import proptypes from 'prop-types';

class SpecialAbilities extends Component {
  render() {
    const { className } = this.props;
    let { specialAbilities } = this.props;
    const cheapenedAbilities = specialAbilities.children.filter(
      sa => sa.name === 'verbilligtesonderfertigkeit'
    );
    specialAbilities = specialAbilities.children.filter(
      sa => sa.name !== 'verbilligtesonderfertigkeit'
    );
    return (
      <div className={className}>
        {specialAbilities.map(specialAbility => {
          const { name } = specialAbility.attributes;
          if (name === 'Kulturkunde' || name === 'Rüstungsgewöhnung I') {
            return (
              <div key={name} className="col-md-12 pt-2">
                <span>
                  {`${name} ${specialAbility.children
                    .map(sa => sa.attributes.name)
                    .join(', ')}`}
                </span>
              </div>
            );
          }
          if (name.indexOf('Wahrer Name: ') > -1) {
            return (
              <div key={name} className="col-md-12 pt-2">
                <span>
                  {`${name} ${specialAbility.children
                    .map(sa =>
                      sa.children.map(e => e.attributes.value).join(' ')
                    )
                    .join(', ')}`}
                </span>
              </div>
            );
          }
          return (
            <div key={name} className="col-md-12 pt-2">
              <span>{name}</span>
            </div>
          );
        })}
        {cheapenedAbilities.map(cheapenedAbility => {
          const { name } = cheapenedAbility.attributes;
          return (
            <div key={name} className="col-md-12 pt-2">
              <span>Verbilligt: {name}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

SpecialAbilities.propTypes = {
  specialAbilities: proptypes.object,
  className: proptypes.string
};

export default SpecialAbilities;
