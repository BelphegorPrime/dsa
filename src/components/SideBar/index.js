import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';

class Sidebar extends Component {
  getSubMenu(hero, name) {
    const { chosenHero, page } = this.props;
    return (
      <Fragment>
        {['Basis', 'Talente', 'Zauber', 'Kampf', 'Kommentare'].map(k => {
          if (
            hero &&
            k === 'Zauber' &&
            hero.children[0].children[7].children.length === 0
          ) {
            return null;
          }
          let className = 'list-group-item';
          if (
            hero &&
            chosenHero &&
            hero.children[0].attributes.name ===
              chosenHero.children[0].attributes.name &&
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
    return (
      <Fragment>
        {heros.xml
          ? Object.keys(heros.xml)
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
                      {this.getSubMenu(heros.xml[name], name)}
                    </ul>
                  </div>
                  {Object.keys(heros.xml).length - 1 !== index ? <hr /> : null}
                </Fragment>
              ))
          : null}
      </Fragment>
    );
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
  chooseHero: () => {},
  removeHero: () => {},
  showPage: () => {}
};

export default Sidebar;
