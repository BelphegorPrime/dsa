import React, { Fragment } from "react";
import { Property } from "../../types";

interface PropertiesProps {
  properties: Property | undefined;
  className: string;
}

const Properties = (props: PropertiesProps) => {
  const { properties, className } = props;
  const borderRight = {
    borderRight: "1px solid lightgrey"
  };
  const tableStyle = {
    ...borderRight,
    borderLeft: "1px solid lightgrey",
    borderBottom: "1px solid lightgrey"
  };
  return (
    <div className={className}>
      <div className="pl-2">
        <table className="table table-sm table-hover" style={tableStyle}>
          <thead>
            <tr>
              <th style={borderRight}>Name</th>
              <th style={borderRight}>Start</th>
              <th style={borderRight}>Mod</th>
              <th style={borderRight}>Wert</th>
              <th>Gekauft</th>
            </tr>
          </thead>
          <tbody>
            {properties ? (
              <Fragment>
                {properties.courage ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Mut</td>
                      <td style={borderRight}>
                        {properties.courage.startValue}
                      </td>
                      <td style={borderRight}>{properties.courage.mod}</td>
                      <td style={borderRight}>{properties.courage.value}</td>
                      <td />
                    </tr>
                  </Fragment>
                ) : null}
                {properties.wisdom ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Klugheit</td>
                      <td style={borderRight}>
                        {properties.wisdom.startValue}
                      </td>
                      <td style={borderRight}>{properties.wisdom.mod}</td>
                      <td style={borderRight}>{properties.wisdom.value}</td>
                      <td />
                    </tr>
                  </Fragment>
                ) : null}
                {properties.intuition ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Intuition</td>
                      <td style={borderRight}>
                        {properties.intuition.startValue}
                      </td>
                      <td style={borderRight}>{properties.intuition.mod}</td>
                      <td style={borderRight}>{properties.intuition.value}</td>
                      <td />
                    </tr>
                  </Fragment>
                ) : null}
                {properties.charisma ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Charisma</td>
                      <td style={borderRight}>
                        {properties.charisma.startValue}
                      </td>
                      <td style={borderRight}>{properties.charisma.mod}</td>
                      <td style={borderRight}>{properties.charisma.value}</td>
                      <td />
                    </tr>
                  </Fragment>
                ) : null}
                {properties.fingerAbility ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Fingerfertigkeit</td>
                      <td style={borderRight}>
                        {properties.fingerAbility.startValue}
                      </td>
                      <td style={borderRight}>
                        {properties.fingerAbility.mod}
                      </td>
                      <td style={borderRight}>
                        {properties.fingerAbility.value}
                      </td>
                      <td />
                    </tr>
                  </Fragment>
                ) : null}
                {properties.dexterity ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Gewandtheit</td>
                      <td style={borderRight}>
                        {properties.dexterity.startValue}
                      </td>
                      <td style={borderRight}>{properties.dexterity.mod}</td>
                      <td style={borderRight}>{properties.dexterity.value}</td>
                      <td />
                    </tr>
                  </Fragment>
                ) : null}
                {properties.constitution ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Konstitution</td>
                      <td style={borderRight}>
                        {properties.constitution.startValue}
                      </td>
                      <td style={borderRight}>{properties.constitution.mod}</td>
                      <td style={borderRight}>
                        {properties.constitution.value}
                      </td>
                      <td />
                    </tr>
                  </Fragment>
                ) : null}
                {properties.strength ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Körperkraft</td>
                      <td style={borderRight}>
                        {properties.strength.startValue}
                      </td>
                      <td style={borderRight}>{properties.strength.mod}</td>
                      <td style={borderRight}>{properties.strength.value}</td>
                      <td />
                    </tr>
                  </Fragment>
                ) : null}
                {properties.socialStatus ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Sozialstatus</td>
                      <td style={borderRight}>
                        {properties.socialStatus.startValue}
                      </td>
                      <td style={borderRight}>{properties.socialStatus.mod}</td>
                      <td style={borderRight}>
                        {properties.socialStatus.value}
                      </td>
                      <td />
                    </tr>
                  </Fragment>
                ) : null}
                {properties.lifeforce ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Lebenspunkte</td>
                      <td style={borderRight}>
                        {properties.lifeforce.calcValue}
                      </td>
                      <td style={borderRight}>{properties.lifeforce.mod}</td>
                      <td style={borderRight}>{properties.lifeforce.value}</td>
                      <td>{properties.lifeforce.basicValue}</td>
                    </tr>
                  </Fragment>
                ) : null}
                {properties.endurance ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Ausdauer</td>
                      <td style={borderRight}>
                        {properties.endurance.calcValue}
                      </td>
                      <td style={borderRight}>{properties.endurance.mod}</td>
                      <td style={borderRight}>{properties.endurance.value}</td>
                      <td>{properties.endurance.basicValue}</td>
                    </tr>
                  </Fragment>
                ) : null}
                {properties.astralEnergy ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Astralenergie</td>
                      <td style={borderRight}>
                        {properties.astralEnergy.calcValue}
                      </td>
                      <td style={borderRight}>{properties.astralEnergy.mod}</td>
                      <td style={borderRight}>
                        {properties.astralEnergy.value}
                      </td>
                      <td>{properties.astralEnergy.basicValue}</td>
                    </tr>
                  </Fragment>
                ) : null}
                {properties.karmaEnergy ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Karmaenergie</td>
                      <td style={borderRight}>
                        {properties.karmaEnergy.calcValue}
                      </td>
                      <td style={borderRight}>{properties.karmaEnergy.mod}</td>
                      <td style={borderRight}>
                        {properties.karmaEnergy.value}
                      </td>
                      <td>{properties.karmaEnergy.basicValue}</td>
                    </tr>
                  </Fragment>
                ) : null}
                {properties.magicResistance ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Magieresistenz</td>
                      <td style={borderRight}>
                        {properties.magicResistance.calcValue}
                      </td>
                      <td style={borderRight}>
                        {properties.magicResistance.mod}
                      </td>
                      <td style={borderRight}>
                        {properties.magicResistance.value}
                      </td>
                      <td>{properties.magicResistance.basicValue}</td>
                    </tr>
                  </Fragment>
                ) : null}
                {properties.initiativBaseValue ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Initiative Basis</td>
                      <td style={borderRight}>
                        {properties.initiativBaseValue.calcValue}
                      </td>
                      <td style={borderRight}>
                        {properties.initiativBaseValue.mod}
                      </td>
                      <td style={borderRight}>
                        {properties.initiativBaseValue.value}
                      </td>
                      <td />
                    </tr>
                  </Fragment>
                ) : null}
                {properties.attackBaseValue ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Attacke Basis</td>
                      <td style={borderRight}>
                        {properties.attackBaseValue.calcValue}
                      </td>
                      <td style={borderRight}>
                        {properties.attackBaseValue.mod}
                      </td>
                      <td style={borderRight}>
                        {properties.attackBaseValue.value}
                      </td>
                      <td />
                    </tr>
                  </Fragment>
                ) : null}
                {properties.paradeBaseValue ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Parade Basis</td>
                      <td style={borderRight}>
                        {properties.paradeBaseValue.calcValue}
                      </td>
                      <td style={borderRight}>
                        {properties.paradeBaseValue.mod}
                      </td>
                      <td style={borderRight}>
                        {properties.paradeBaseValue.value}
                      </td>
                      <td />
                    </tr>
                  </Fragment>
                ) : null}
                {properties.remoteCombatBaseValue ? (
                  <Fragment>
                    <tr>
                      <td style={borderRight}>Fernkampf Basis</td>
                      <td style={borderRight}>
                        {properties.remoteCombatBaseValue.calcValue}
                      </td>
                      <td style={borderRight}>
                        {properties.remoteCombatBaseValue.mod}
                      </td>
                      <td style={borderRight}>
                        {properties.remoteCombatBaseValue.value}
                      </td>
                      <td />
                    </tr>
                  </Fragment>
                ) : null}
              </Fragment>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Properties;
