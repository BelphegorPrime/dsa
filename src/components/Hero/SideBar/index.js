import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';

class Sidebar extends Component {
  getSubMenu(hero, name) {
    const { chosenHero, page } = this.props;
    return (
      <Fragment>
        {['Basis', 'Talente', 'Zauber', 'Kampf', 'Kommentare'].map(k => {
          if (hero && k === 'Zauber' && !hero.spellList) {
            return null;
          }
          let className = 'list-group-item';
          if (
            hero &&
            chosenHero &&
            hero.name === chosenHero.converted.name &&
            page === k
          ) {
            className = 'list-group-item active';
          }
          return (
            <li
              key={name + k}
              className={className}
              onClick={this.props.showPage.bind(this, k)}>
              {k}
            </li>
          );
        })}
      </Fragment>
    );
  }

  render() {
    const { heros, chooseHero, removeHero } = this.props;
    if (!heros) {
      return null;
    }
    return Object.keys(heros)
      .sort()
      .map((name, index) => (
        <Fragment key={name + index}>
          <div className="row" onClick={chooseHero.bind(this, name)}>
            <ul className="list-group list-group-flush col-md-12">
              <li className="list-group-item">
                <div className="row">
                  <div className="col-md-10">
                    <span className="font-weight-bold">{name}</span>
                  </div>
                  <span
                    className="col-md-2 btn btn-secondary"
                    onClick={removeHero.bind(this, name)}>
                    X
                  </span>
                </div>
              </li>
              {this.getSubMenu(heros[name].converted, name)}
            </ul>
          </div>
          {Object.keys(heros).length - 1 !== index ? <hr /> : null}
        </Fragment>
      ));
  }
}

Sidebar.propTypes = {
  heros: proptypes.object,
  chosenHero: proptypes.object,
  page: proptypes.string,
  chooseHero: proptypes.func,
  removeHero: proptypes.func,
  showPage: proptypes.func
};

Sidebar.defaultProps = {
  heros: [],
  chosenHero: {},
  page: '',
  chooseHero: () => {
    console.warn('no chooseHero Function Provided');
  },
  removeHero: () => {
    console.warn('no removeHero Function Provided');
  },
  showPage: () => {
    console.warn('no showPage Function Provided');
  }
};

export default Sidebar;