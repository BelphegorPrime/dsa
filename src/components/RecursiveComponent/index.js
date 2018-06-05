import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';

class RecursiveComponent extends Component {
  render() {
    const { node, wrapper, doBreak } = this.props;
    const { attributes, children, name } = node;
    let attributeValues = null;
    if (attributes) {
      attributeValues = (
        <Fragment>
          {name === 'muenze' && attributes.anzahl
            ? `${attributes.anzahl}\n`
            : null}
          {name !== 'rasse' &&
          name !== 'ausbildung' &&
          attributes.name &&
          attributes.name.indexOf('helden.model.kultur.') === -1
            ? `${attributes.name}\n`
            : null}
          {attributes.string ? attributes.string : null}
          {attributes.probe ? attributes.probe : null}{' '}
          {name !== 'verify' && attributes.value ? attributes.value : null}
          {name !== 'muenze' && attributes.anzahl ? attributes.anzahl : null}
          {attributes.startwert ? ` (${attributes.startwert})` : null}
          {attributes.mod
            ? parseInt(attributes.mod, 10) >= 0
              ? `+${attributes.mod}`
              : attributes.mod
            : null}
          {attributes.at ? `AT: ${attributes.at}` : null}
          {attributes.pa ? `PA: ${attributes.pa}` : null}
          {attributes.akt ? attributes.akt : null}
          {attributes.min ? attributes.min : null}
          {attributes.key ? attributes.min : null}
          {attributes.anmerkungen ? attributes.anmerkungen : null}
          {attributes.hauszauber ? attributes.hauszauber : null}
          {attributes.k ? attributes.k : null}
          {attributes.kosten ? attributes.kosten : null}
          {attributes.reichweite ? attributes.reichweite : null}
          {attributes.repraesentation ? attributes.repraesentation : null}
          {attributes.variante ? attributes.variante : null}
          {attributes.wirkungsdauer ? attributes.wirkungsdauer : null}
          {attributes.zauberdauer ? attributes.zauberdauer : null}
          {attributes.lernmethode ? attributes.lernmethode : null}
          {attributes.waffenname ? attributes.waffenname : null}
          {attributes.talent ? attributes.talent : null}
          {attributes.bezeichner ? attributes.bezeichner : null}
          {attributes.bfakt ? attributes.bfakt : null}
          {attributes.bfmin ? attributes.bfmin : null}
          {attributes.hand ? attributes.hand : null}
          {attributes.schild ? attributes.schild : null}
          {attributes.set ? attributes.set : null}
          {attributes.slot ? attributes.slot : null}
          {attributes.so ? attributes.so : null}
          {attributes.beschreibung
            ? attributes.beschreibung.split('&#10;')
            : null}
          {attributes.kommentar ? attributes.kommentar.split('&#10;') : null}
          {attributes.zauberkommentar
            ? attributes.zauberkommentar.split('&#10;')
            : null}
          {attributes.notiz0 ? attributes.notiz0.split('&#10;') : null}
        </Fragment>
      );
    }
    const filteredName =
      [
        'basis',
        'eigenschaft',
        'eigenschaften',
        'sf',
        'sonderfertigkeit',
        'vt',
        'vorteil',
        'Selbststudium',
        'talent',
        'talentliste',
        'zauber',
        'zauberliste',
        'kampf',
        'kampfwerte',
        'gegenstände',
        'gegenstand',
        'notiz',
        'Notizen',
        'verify',
        'kommentare',
        'kommentar',
        'sfInfos',
        'ausrüstungen',
        'heldenausruestung',
        'verbindungen',
        'geldboerse',
        'muenze',
        'vorteile',
        'sonderfertigkeiten',
        'auswahl',
        'portraet'
      ].indexOf(name) === -1
        ? name
        : null;

    return React.createElement(
      wrapper,
      {},
      <Fragment>
        {filteredName}
        {attributeValues} {doBreak ? <br /> : null}
        {children
          ? children.map((child, index) => (
              <RecursiveComponent
                key={child.name + index}
                node={child}
                wrapper={'span'}
              />
            ))
          : null}
      </Fragment>
    );
  }
}

RecursiveComponent.propTypes = {
  node: proptypes.object,
  wrapper: proptypes.string,
  doBreak: proptypes.bool
};

export default RecursiveComponent;
