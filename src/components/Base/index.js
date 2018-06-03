import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';

class App extends Component {
  render() {
    const { name, base, className } = this.props;
    const note = base.children[6].attributes.notiz0;
    return (
      <div className={className}>
        <span>{name}</span>
        <br />
        <span>Geschlecht: {base.children[0].attributes.name}</span>
        <br />
        <span>{base.children[2].attributes.string}</span>
        <br />
        <span>{base.children[3].attributes.string}</span>
        <br />
        <span>{base.children[4].children[0].attributes.string}</span>
        <br />
        <span>
          {note !== 'Notizen'
            ? note.split('&#10;').map(n => (
                <Fragment key={n}>
                  <span>{n}</span>
                  <br />
                </Fragment>
              ))
            : null}
        </span>
        <br />
        <br />
        <span>{base.children[8].attributes.value} AP vergeben</span>
        <br />
        <span>{base.children[9].attributes.value} AP unvergeben</span>
      </div>
    );
  }
}

App.propTypes = {
  base: proptypes.object,
  name: proptypes.string,
  className: proptypes.string
};

export default App;
