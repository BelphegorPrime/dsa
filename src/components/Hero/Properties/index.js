import React, { Component } from 'react';
import proptypes from 'prop-types';

class Properties extends Component {
  render() {
    const { properties } = this.props;
    return (
      <div>
        <div className="pl-2 pt-2">
          <table className="table table-sm table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Startwert</th>
                <th>Mod</th>
                <th>Wert</th>
                <th>Gekauft</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mut</td>
                <td>{properties.courage.startValue}</td>
                <td>{properties.courage.mod}</td>
                <td>{properties.courage.value}</td>
                <td />
              </tr>
              <tr>
                <td>Klugheit</td>
                <td>{properties.wisdom.startValue}</td>
                <td>{properties.wisdom.mod}</td>
                <td>{properties.wisdom.value}</td>
                <td />
              </tr>
              <tr>
                <td>Intuition</td>
                <td>{properties.intuition.startValue}</td>
                <td>{properties.intuition.mod}</td>
                <td>{properties.intuition.value}</td>
                <td />
              </tr>
              <tr>
                <td>Charisma</td>
                <td>{properties.charisma.startValue}</td>
                <td>{properties.charisma.mod}</td>
                <td>{properties.charisma.value}</td>
                <td />
              </tr>
              <tr>
                <td>Fingerfertigkeit</td>
                <td>{properties.fingerAbility.startValue}</td>
                <td>{properties.fingerAbility.mod}</td>
                <td>{properties.fingerAbility.value}</td>
                <td />
              </tr>
              <tr>
                <td>Gewandtheit</td>
                <td>{properties.dexterity.startValue}</td>
                <td>{properties.dexterity.mod}</td>
                <td>{properties.dexterity.value}</td>
                <td />
              </tr>
              <tr>
                <td>Konstitution</td>
                <td>{properties.constitution.startValue}</td>
                <td>{properties.constitution.mod}</td>
                <td>{properties.constitution.value}</td>
                <td />
              </tr>
              <tr>
                <td>Körperkraft</td>
                <td>{properties.strength.startValue}</td>
                <td>{properties.strength.mod}</td>
                <td>{properties.strength.value}</td>
                <td />
              </tr>
              <tr>
                <td>Sozialstatus</td>
                <td>{properties.socialStatus.startValue}</td>
                <td>{properties.socialStatus.mod}</td>
                <td>{properties.socialStatus.value}</td>
                <td />
              </tr>
              <tr>
                <td>Lebenspunkte</td>
                <td>{properties.lifeforce.calcValue}</td>
                <td>{properties.lifeforce.mod}</td>
                <td>{properties.lifeforce.value}</td>
                <td>{properties.lifeforce.basicValue}</td>
              </tr>
              <tr>
                <td>Ausdauer</td>
                <td>{properties.endurance.calcValue}</td>
                <td>{properties.endurance.mod}</td>
                <td>{properties.endurance.value}</td>
                <td>{properties.endurance.basicValue}</td>
              </tr>
              <tr>
                <td>Astralenergie</td>
                <td>{properties.astralEnergy.calcValue}</td>
                <td>{properties.astralEnergy.mod}</td>
                <td>{properties.astralEnergy.value}</td>
                <td>{properties.astralEnergy.basicValue}</td>
              </tr>
              <tr>
                <td>Karmaenergie</td>
                <td>{properties.karmaEnergy.calcValue}</td>
                <td>{properties.karmaEnergy.mod}</td>
                <td>{properties.karmaEnergy.value}</td>
                <td>{properties.karmaEnergy.basicValue}</td>
              </tr>
              <tr>
                <td>Magieresistenz</td>
                <td>{properties.magicResistance.calcValue}</td>
                <td>{properties.magicResistance.mod}</td>
                <td>{properties.magicResistance.value}</td>
                <td>{properties.magicResistance.basicValue}</td>
              </tr>
              <tr>
                <td>Initiative Basis</td>
                <td>{properties.initiativBaseValue.calcValue}</td>
                <td>{properties.initiativBaseValue.mod}</td>
                <td>{properties.initiativBaseValue.value}</td>
                <td />
              </tr>
              <tr>
                <td>Attacke Basis</td>
                <td>{properties.attackBaseValue.calcValue}</td>
                <td>{properties.attackBaseValue.mod}</td>
                <td>{properties.attackBaseValue.value}</td>
                <td />
              </tr>
              <tr>
                <td>Parade Basis</td>
                <td>{properties.paradeBaseValue.calcValue}</td>
                <td>{properties.paradeBaseValue.mod}</td>
                <td>{properties.paradeBaseValue.value}</td>
                <td />
              </tr>
              <tr>
                <td>Fernkampf Basis</td>
                <td>{properties.remoteCombatBaseValue.calcValue}</td>
                <td>{properties.remoteCombatBaseValue.mod}</td>
                <td>{properties.remoteCombatBaseValue.value}</td>
                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Properties.propTypes = {
  properties: proptypes.object
};

export default Properties;
