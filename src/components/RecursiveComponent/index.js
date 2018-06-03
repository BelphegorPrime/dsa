import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';

class RecursiveComponent extends Component {
  render() {
    const { node, wrapper } = this.props;
    const { attributes, children, name } = node;
    let attributeValues = null;
    if (attributes) {
      attributeValues = (
        <Fragment>
          {attributes.name ? attributes.name : null}
          {attributes.string ? attributes.string : null}
          {attributes.probe ? attributes.probe : null}
          {attributes.value ? attributes.value : null}
          {attributes.startwert ? ` (${attributes.startwert})` : null}
          {attributes.mod ? attributes.mod : null}
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
          {attributes.zauberkommentar ? attributes.zauberkommentar : null}
          {attributes.notiz0 ? attributes.notiz0.split('&#10;') : null}
        </Fragment>
      );
    }
    const filteredName =
      name !== 'eigenschaft' &&
      name !== 'eigenschaften' &&
      name !== 'sf' &&
      name !== 'sonderfertigkeit' &&
      name !== 'vt' &&
      name !== 'vorteil' &&
      name !== 'Selbststudium' &&
      name !== 'talent' &&
      name !== 'talentliste' &&
      name !== 'zauber' &&
      name !== 'zauberliste' &&
      name !== 'kampf' &&
      name !== 'kampfwerte' &&
      name !== 'portraet'
        ? name
        : null;

    return React.createElement(
      wrapper,
      {},
      <Fragment>
        {/* {Object.values(node.attributes)} */}
        {filteredName}
        {attributeValues}
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

// zauberdauer
// zauberkommentar

RecursiveComponent.propTypes = {
  node: proptypes.object,
  wrapper: proptypes.string
};

export default RecursiveComponent;
