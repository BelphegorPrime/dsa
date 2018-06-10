import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';

class Objects extends Component {
  render() {
    const { objects, className } = this.props;
    return (
      <div className={className}>
        {Object.keys(objects).map(name => {
          const object = objects[name];
          return (
            <div key={name} className="col-md-12 pt-2">
              <span>{`${name} ${object.amount} Stk`}</span>
              {object.distantWeapon ? ` Kampftalent: ${object.talent}` : null}
              {object.properties ? (
                <Fragment>
                  <br />
                  <span>
                    {` ${object.name} ${object.price}S (${
                      object.weight
                    } Unzen) `}
                  </span>
                  <br />
                  <span>
                    <span className="font-weight-bold">Mut</span>{' '}
                    {object.properties.courage.value}{' '}
                  </span>
                  <span>
                    <span className="font-weight-bold">Klugheit</span>{' '}
                    {object.properties.wisdom.value}{' '}
                  </span>
                  <span>
                    <span className="font-weight-bold">Intuition</span>{' '}
                    {object.properties.intuition.value}{' '}
                  </span>
                  <span>
                    <span className="font-weight-bold">Charisma</span>{' '}
                    {object.properties.charisma.value}{' '}
                  </span>
                  <span>
                    <span className="font-weight-bold">Fingerfertigkeit</span>{' '}
                    {object.properties.fingerAbility.value}{' '}
                  </span>
                  <span>
                    <span className="font-weight-bold">Gewandtheit</span>{' '}
                    {object.properties.dexterity.value}{' '}
                  </span>
                  <span>
                    <span className="font-weight-bold">Konstitution</span>{' '}
                    {object.properties.constitution.value}{' '}
                  </span>
                  <span>
                    <span className="font-weight-bold">Körperkraft</span>{' '}
                    {object.properties.strength.value}{' '}
                  </span>
                  <span>
                    <span className="font-weight-bold">Lebensenergie</span>{' '}
                    {object.properties.lifeforce.basicValue}{' '}
                  </span>
                  <span>
                    <span className="font-weight-bold">Ausdauer</span>{' '}
                    {object.properties.endurance.basicValue}{' '}
                  </span>
                  <span>
                    <span className="font-weight-bold">Astralenergie</span>{' '}
                    {object.properties.astralEnergy.basicValue}{' '}
                  </span>
                  <span>
                    <span className="font-weight-bold">Gefahrenwert</span>{' '}
                    {object.properties.risk.value}{' '}
                  </span>
                  <span>
                    <span className="font-weight-bold">Loyalität</span>{' '}
                    {object.properties.loyalty.value}{' '}
                  </span>
                  <span>
                    <span className="font-weight-bold">Geschwindigkeit</span>{' '}
                    {object.properties.speed.value}{' '}
                  </span>
                  <span>
                    <span className="font-weight-bold">Rüstungsschutz</span>{' '}
                    {object.properties.armor.value}{' '}
                  </span>
                  <span>
                    <span className="font-weight-bold">Magieresistenz</span>{' '}
                    {object.properties.magicResistance.calcValue} /{' '}
                    {object.properties.magicResistance2.value}{' '}
                  </span>
                </Fragment>
              ) : null}

              <hr className="m-0" />
            </div>
          );
        })}
      </div>
    );
  }
}

Objects.propTypes = {
  objects: proptypes.object,
  className: proptypes.string
};

export default Objects;
