import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

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
          if (
            specialAbility.attributes.name === 'Kulturkunde' ||
            specialAbility.attributes.name === 'Rüstungsgewöhnung I'
          ) {
            return (
              <div className="col-md-12 pt-2">
                <span>
                  {`${
                    specialAbility.attributes.name
                  } ${specialAbility.children
                    .map(sa => sa.attributes.name)
                    .join(', ')}`}
                </span>
              </div>
            );
          }
          if (specialAbility.attributes.name.indexOf('Wahrer Name: ') > -1) {
            console.log(specialAbility);
            return (
              <div className="col-md-12 pt-2">
                <span>
                  {`${
                    specialAbility.attributes.name
                  } ${specialAbility.children
                    .map(sa =>
                      sa.children.map(e => e.attributes.value).join(' ')
                    )
                    .join(', ')}`}
                </span>
              </div>
            );
          }
          return (
            <div className="col-md-12 pt-2">
              <span>{specialAbility.attributes.name}</span>
            </div>
          );
        })}
        {cheapenedAbilities.map(cheapenedAbility => (
          <div className="col-md-12 pt-2">
            <span>{cheapenedAbility.attributes.name}</span>
          </div>
        ))}
        <RecursiveComponent node={specialAbilities} wrapper={'span'} />
      </div>
    );
  }
}

SpecialAbilities.propTypes = {
  specialAbilities: proptypes.object,
  className: proptypes.string
};

export default SpecialAbilities;
