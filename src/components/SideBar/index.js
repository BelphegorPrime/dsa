import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';

class App extends Component {
  // static defaultProps = {
  //   heros: [],
  //   chooseHero: () =>{},
  //   removeHero: () =>{},
  //   showPage: () =>{}
  // }
  getSubMenu(hero, name) {
    // const liObject = {
    //   Basis: [
    //     'base',
    //     'properties',
    //     'advantages',
    //     'specialAbilities',
    //     'connections'
    //   ],
    //   Talente: ['talentList'],
    //   Zauber: ['spellList'],
    //   Kampf: ['objects', 'equipment', 'purse']
    // };
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
        {Object.keys(heros)
          .sort()
          .map((name, index) => (
            <Fragment>
              <div
                key={name + index}
                className="row"
                onClick={chooseHero.bind(this, name)}>
                <ul className="list-group list-group-flush col-md-12">
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-md-10">{name}</div>
                      <span
                        className="col-md-2 btn btn-secondary"
                        onClick={removeHero.bind(this, name)}>
                        X
                      </span>
                    </div>
                  </li>
                  {this.getSubMenu(heros[name], name)}
                </ul>
              </div>
              {Object.keys(heros).length - 1 !== index ? <hr /> : null}
            </Fragment>
          ))}
      </Fragment>
    );
  }
}

App.propTypes = {
  chooseHero: proptypes.func,
  removeHero: proptypes.func,
  showPage: proptypes.func,
  heros: proptypes.array,
  chosenHero: proptypes.object,
  page: proptypes.string
};

export default App;
