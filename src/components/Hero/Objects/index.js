import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';

class Objects extends Component {
  render() {
    const { objects, className } = this.props;
    return (
      <div className={className}>
        <div className="pl-2 pt-2">
          <span className="font-weight-bold">Ausrüstung</span>
          {Object.keys(objects).map(name => {
            const object = objects[name];
            return (
              <div key={name} className="col-md-12 pl-2">
                <span>{`${name} ${object.amount} Stk`}</span>
                {object.distantWeapon ? ` Kampftalent: ${object.talent}` : null}
                {object.properties ? (
                  <Fragment>
                    <br />
                    <span>
                      {' '}
                      {object.name ? object.name : ''}{' '}
                      {object.price ? `${object.price}S` : ''}{' '}
                      {object.weight ? `(${object.weight} Unzen)` : ''}
                    </span>
                    {object.name || object.price || object.weight ? (
                      <br />
                    ) : null}
                    {object.properties.courage ? (
                      <span>
                        <span className="font-weight-bold">Mut</span>{' '}
                        {object.properties.courage.value}{' '}
                      </span>
                    ) : null}
                    {object.properties.wisdom ? (
                      <span>
                        <span className="font-weight-bold">Klugheit</span>{' '}
                        {object.properties.wisdom.value}{' '}
                      </span>
                    ) : null}
                    {object.properties.intuition ? (
                      <span>
                        <span className="font-weight-bold">Intuition</span>{' '}
                        {object.properties.intuition.value}{' '}
                      </span>
                    ) : null}
                    {object.properties.charisma ? (
                      <span>
                        <span className="font-weight-bold">Charisma</span>{' '}
                        {object.properties.charisma.value}{' '}
                      </span>
                    ) : null}
                    {object.properties.fingerAbility ? (
                      <span>
                        <span className="font-weight-bold">
                          Fingerfertigkeit
                        </span>{' '}
                        {object.properties.fingerAbility.value}{' '}
                      </span>
                    ) : null}
                    {object.properties.dexterity ? (
                      <span>
                        <span className="font-weight-bold">Gewandtheit</span>{' '}
                        {object.properties.dexterity.value}{' '}
                      </span>
                    ) : null}
                    {object.properties.constitution ? (
                      <span>
                        <span className="font-weight-bold">Konstitution</span>{' '}
                        {object.properties.constitution.value}{' '}
                      </span>
                    ) : null}
                    {object.properties.strength ? (
                      <span>
                        <span className="font-weight-bold">Körperkraft</span>{' '}
                        {object.properties.strength.value}{' '}
                      </span>
                    ) : null}
                    {object.properties.lifeforce ? (
                      <span>
                        <span className="font-weight-bold">Lebensenergie</span>{' '}
                        {object.properties.lifeforce.basicValue}{' '}
                      </span>
                    ) : null}
                    {object.properties.endurance ? (
                      <span>
                        <span className="font-weight-bold">Ausdauer</span>{' '}
                        {object.properties.endurance.basicValue}{' '}
                      </span>
                    ) : null}
                    {object.properties.astralEnergy ? (
                      <span>
                        <span className="font-weight-bold">Astralenergie</span>{' '}
                        {object.properties.astralEnergy.basicValue}{' '}
                      </span>
                    ) : null}
                    {object.properties.risk ? (
                      <span>
                        <span className="font-weight-bold">Gefahrenwert</span>{' '}
                        {object.properties.risk.value}{' '}
                      </span>
                    ) : null}
                    {object.properties.loyalty ? (
                      <span>
                        <span className="font-weight-bold">Loyalität</span>{' '}
                        {object.properties.loyalty.value}{' '}
                      </span>
                    ) : null}
                    {object.properties.speed ? (
                      <span>
                        <span className="font-weight-bold">
                          Geschwindigkeit
                        </span>{' '}
                        {object.properties.speed.value}{' '}
                      </span>
                    ) : null}
                    {object.properties.armor ? (
                      <span>
                        <span className="font-weight-bold">Rüstungsschutz</span>{' '}
                        {object.properties.armor.value}{' '}
                      </span>
                    ) : null}
                    {object.properties.magicResistance &&
                    object.properties.magicResistance2 ? (
                      <span>
                        <span className="font-weight-bold">Magieresistenz</span>{' '}
                        {object.properties.magicResistance.calcValue} /{' '}
                        {object.properties.magicResistance2.value}{' '}
                      </span>
                    ) : null}
                  </Fragment>
                ) : null}

                <hr className="m-0" />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Objects.propTypes = {
  objects: proptypes.object,
  className: proptypes.string
};

export default Objects;
