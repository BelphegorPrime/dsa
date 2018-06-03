import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from '../RecursiveComponent';

class App extends Component {
  static calc2(x, y, z) {
    return Math.round(
      (parseInt(x, 10) + parseInt(y, 10) + parseInt(z, 10)) / 2
    );
  }

  static calc5(x, y, z, a = '0') {
    return Math.round(
      (parseInt(x, 10) + parseInt(y, 10) + parseInt(z, 10) + parseInt(a, 10)) /
        5
    );
  }

  static calcKe(x, y, z) {
    return 0;
  }

  render() {
    const { properties, className } = this.props;
    const { children } = properties;
    const [
      MU,
      KL,
      IN,
      CH,
      FF,
      GE,
      KO,
      KK,
      SO,
      LE,
      AU,
      AE,
      KE,
      MR,
      INI,
      AT,
      PA,
      FK
    ] = children;
    return (
      <div className={className}>
        {/* <RecursiveComponent node={properties} wrapper={'span'} /> */}
        <table>
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
              <td>{MU.attributes.name}</td>
              <td>{MU.attributes.startwert}</td>
              <td>{MU.attributes.mod}</td>
              <td>{MU.attributes.value}</td>
              <td />
            </tr>
            <tr>
              <td>{KL.attributes.name}</td>
              <td>{KL.attributes.startwert}</td>
              <td>{KL.attributes.mod}</td>
              <td>{KL.attributes.value}</td>
              <td />
            </tr>
            <tr>
              <td>{IN.attributes.name}</td>
              <td>{IN.attributes.startwert}</td>
              <td>{IN.attributes.mod}</td>
              <td>{IN.attributes.value}</td>
              <td />
            </tr>
            <tr>
              <td>{CH.attributes.name}</td>
              <td>{CH.attributes.startwert}</td>
              <td>{CH.attributes.mod}</td>
              <td>{CH.attributes.value}</td>
              <td />
            </tr>
            <tr>
              <td>{FF.attributes.name}</td>
              <td>{FF.attributes.startwert}</td>
              <td>{FF.attributes.mod}</td>
              <td>{FF.attributes.value}</td>
              <td />
            </tr>
            <tr>
              <td>{GE.attributes.name}</td>
              <td>{GE.attributes.startwert}</td>
              <td>{GE.attributes.mod}</td>
              <td>{GE.attributes.value}</td>
              <td />
            </tr>
            <tr>
              <td>{KO.attributes.name}</td>
              <td>{KO.attributes.startwert}</td>
              <td>{KO.attributes.mod}</td>
              <td>{KO.attributes.value}</td>
              <td />
            </tr>
            <tr>
              <td>{KK.attributes.name}</td>
              <td>{KK.attributes.startwert}</td>
              <td>{KK.attributes.mod}</td>
              <td>{KK.attributes.value}</td>
              <td />
            </tr>
            <tr>
              <td>{SO.attributes.name}</td>
              <td>{SO.attributes.startwert}</td>
              <td>{SO.attributes.mod}</td>
              <td>{SO.attributes.value}</td>
              <td />
            </tr>
            <tr>
              <td>{LE.attributes.name}</td>
              <td>
                {App.calc2(
                  KO.attributes.value,
                  KO.attributes.value,
                  KK.attributes.value
                )}
              </td>
              <td>{LE.attributes.mod}</td>
              <td>
                {App.calc2(
                  KO.attributes.value,
                  KO.attributes.value,
                  KK.attributes.value
                ) +
                  parseInt(LE.attributes.mod, 10) +
                  parseInt(LE.attributes.value, 10)}
              </td>
              <td>{LE.attributes.value}</td>
            </tr>
            <tr>
              <td>{AU.attributes.name}</td>
              <td>
                {App.calc2(
                  KO.attributes.value,
                  KO.attributes.value,
                  KK.attributes.value
                )}
              </td>
              <td>{AU.attributes.mod}</td>
              <td>
                {App.calc2(
                  KO.attributes.value,
                  KO.attributes.value,
                  KK.attributes.value
                ) +
                  parseInt(AU.attributes.mod, 10) +
                  parseInt(AU.attributes.value, 10)}
              </td>
              <td>{AU.attributes.value}</td>
            </tr>
            <tr>
              <td>{AE.attributes.name}</td>
              <td>
                {App.calc2(
                  MU.attributes.value,
                  IN.attributes.value,
                  CH.attributes.value
                )}
              </td>
              <td>{AE.attributes.mod}</td>
              <td>
                {App.calc2(
                  MU.attributes.value,
                  IN.attributes.value,
                  CH.attributes.value
                ) +
                  parseInt(AE.attributes.mod, 10) +
                  parseInt(AE.attributes.value, 10)}
              </td>
              <td>{AE.attributes.value}</td>
            </tr>
            <tr>
              <td>{KE.attributes.name}</td>
              <td>
                {App.calcKe(
                  MU.attributes.value,
                  IN.attributes.value,
                  CH.attributes.value
                )}
              </td>
              <td>{KE.attributes.mod}</td>
              <td>
                {App.calcKe(
                  MU.attributes.value,
                  IN.attributes.value,
                  CH.attributes.value
                ) +
                  parseInt(KE.attributes.mod, 10) +
                  parseInt(KE.attributes.value, 10)}
              </td>
              <td>{KE.attributes.value}</td>
            </tr>
            <tr>
              <td>{MR.attributes.name}</td>
              <td>
                {App.calc5(
                  MU.attributes.value,
                  KL.attributes.value,
                  KO.attributes.value
                )}
              </td>
              <td>{MR.attributes.mod}</td>
              <td>
                {App.calc5(
                  MU.attributes.value,
                  KL.attributes.value,
                  KO.attributes.value
                ) +
                  parseInt(MR.attributes.mod, 10) +
                  parseInt(MR.attributes.value, 10)}
              </td>
              <td>{MR.attributes.value}</td>
            </tr>
            <tr>
              <td>Initiative Basis</td>
              <td>
                {App.calc5(
                  MU.attributes.value,
                  MU.attributes.value,
                  IN.attributes.value,
                  GE.attributes.value
                )}
              </td>
              <td>{INI.attributes.mod}</td>
              <td>
                {App.calc5(
                  MU.attributes.value,
                  MU.attributes.value,
                  IN.attributes.value,
                  GE.attributes.value
                ) + parseInt(INI.attributes.mod, 10)}
              </td>
              <td />
            </tr>
            <tr>
              <td>Attacke Basis</td>
              <td>
                {App.calc5(
                  MU.attributes.value,
                  GE.attributes.value,
                  KK.attributes.value
                )}
              </td>
              <td>{AT.attributes.mod}</td>
              <td>
                {App.calc5(
                  MU.attributes.value,
                  GE.attributes.value,
                  KK.attributes.value
                ) + parseInt(AT.attributes.mod, 10)}
              </td>
              <td />
            </tr>
            <tr>
              <td>Parade Basis</td>
              <td>
                {App.calc5(
                  IN.attributes.value,
                  GE.attributes.value,
                  KK.attributes.value
                )}
              </td>
              <td>{PA.attributes.mod}</td>
              <td>
                {App.calc5(
                  IN.attributes.value,
                  GE.attributes.value,
                  KK.attributes.value
                ) + parseInt(PA.attributes.mod, 10)}
              </td>
              <td />
            </tr>
            <tr>
              <td>Fernkampf Basis</td>
              <td>
                {App.calc5(
                  IN.attributes.value,
                  FF.attributes.value,
                  KK.attributes.value
                )}
              </td>
              <td>{FK.attributes.mod}</td>
              <td>
                {App.calc5(
                  IN.attributes.value,
                  FF.attributes.value,
                  KK.attributes.value
                ) + parseInt(FK.attributes.mod, 10)}
              </td>
              <td />
            </tr>
          </tbody>
        </table>
        {/* <span> */}
        {/* {children[0].attributes.startwert ? ( */}
        {/* <span> */}
        {/* {children[0].attributes.name} */}

        {/* {`${`${children[0].attributes.name} ${ */}
        {/* children[0].attributes.startwert */}
        {/* }`} (${children[0].attributes.mod}) | ${ */}
        {/* children[0].attributes.value */}
        {/* }`} */}
        {/* <br /> */}
        {/* </span> */}
        {/* ) : ( */}
        {/* <span> */}
        {/* {`${`${children[0].attributes.name} ${ */}
        {/* children[0].attributes.value */}
        {/* }`}(${children[0].attributes.mod})`} */}
        {/* <br /> */}
        {/* </span> */}
        {/* )} */}
        {/* </span> */}
        {/* {properties.children.map( */}
        {/* p => */}
        {/* p.attributes.startwert ? ( */}
        {/* <span key={p.attributes.name}> */}
        {/* {`${`${p.attributes.name} ${p.attributes.startwert}`} (${ */}
        {/* p.attributes.mod */}
        {/* }) | ${p.attributes.value}`} */}
        {/* <br /> */}
        {/* </span> */}
        {/* ) : ( */}
        {/* <span key={p.attributes.name}> */}
        {/* {`${`${p.attributes.name} ${p.attributes.value}`}(${ */}
        {/* p.attributes.mod */}
        {/* })`} */}
        {/* <br /> */}
        {/* </span> */}
        {/* ) */}
        {/* )} */}
      </div>
    );
  }
}

App.propTypes = {
  properties: proptypes.object,
  className: proptypes.string
};

export default App;
