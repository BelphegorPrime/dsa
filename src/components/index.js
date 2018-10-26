import React, { Component } from 'react';
import { countBy, values } from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';

import Head from './Head';
import Body from './Body';

import { convert } from '../heroConverter';
import { rollDice } from '../helperFunctions';

class App extends Component {
  constructor() {
    super();
    this.initialState = {
      page: 'default',
      heros: {},
      chosenHero: null,
      heroPage: null,
      houseRules: [],
      houseRuleToShow: 'templates'
    };
    this.state = this.initialState;
    this.fileUpload = React.createRef();
    const throws = [];
    for (let i = 0; i < 100000; i += 1) {
      throws[i] = rollDice(20);
    }
    this.throws = values(countBy(throws));
  }

  componentDidMount() {
    this.setState({
      // eslint-disable-next-line no-undef
      heros: JSON.parse(window.localStorage.getItem('heros')) || null,
      // eslint-disable-next-line no-undef
      houseRules: JSON.parse(window.localStorage.getItem('houseRules')) || [],
      // eslint-disable-next-line no-undef
      chosenHero: JSON.parse(window.localStorage.getItem('hero')) || null
    });
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextState.chosenHero) {
      // eslint-disable-next-line no-undef
      window.localStorage.setItem('hero', JSON.stringify(nextState.chosenHero));
    }
    if (nextState.heros && Object.keys(nextState.heros).length > 0) {
      // eslint-disable-next-line no-undef
      window.localStorage.setItem('heros', JSON.stringify(nextState.heros));
    }
    if (nextState.houseRules && nextState.houseRules.length > 0) {
      // eslint-disable-next-line no-undef
      window.localStorage.setItem(
        'houseRules',
        JSON.stringify(nextState.houseRules)
      );
    }
    return nextState;
  }

  appendToState(xml, converted) {
    const { name } = xml.children[0].attributes;
    const { state } = this;
    const composedHero = {
      xml,
      converted
    };
    state.chosenHero = composedHero;
    state.heros = Object.assign(
      {
        [name]: composedHero
      },
      state.heros
    );
    this.setState(state);
  }

  handleChange(page) {
    this.setState({
      page
    });
  }

  chooseHero(name) {
    this.setState({
      chosenHero: this.state.heros[name]
    });
  }

  removeHero(name) {
    const { heros } = this.state;
    let { chosenHero } = this.state;
    if (chosenHero && chosenHero.xml.children[0].attributes.name === name) {
      chosenHero = null;
    }
    delete heros[name];
    this.setState({
      heros,
      chosenHero
    });
  }

  updateHero(hero) {
    const { name } = hero.xml.children[0].attributes;
    const { heros } = this.state;
    heros[name] = hero;
    this.setState({
      heros,
      chosenHero: hero
    });
  }

  showHeroPage(heroPage) {
    this.setState({
      heroPage
    });
  }

  addedHouseRule(rule) {
    const { houseRules, heros } = this.state;
    const otherHouseRules = houseRules.filter(r => r.page !== rule.page);
    otherHouseRules.push(rule);
    Object.keys(heros).forEach(name => {
      const { xml } = heros[name];
      this.appendToState(xml, convert(xml, otherHouseRules));
    });
    this.setState({ houseRules: otherHouseRules });
  }

  setHouseRuleToShow(type) {
    this.setState({ houseRuleToShow: type });
  }

  removeRule(id) {
    const { houseRules, heros } = this.state;
    const otherHouseRules = houseRules.filter(hr => hr.id !== id);
    Object.keys(heros).forEach(name => {
      const { xml } = heros[name];
      this.appendToState(xml, convert(xml, otherHouseRules));
    });
    this.setState({ houseRules: otherHouseRules });
  }

  resetState() {
    this.setState(this.initialState);
  }

  render() {
    const {
      heros,
      chosenHero,
      heroPage,
      page,
      houseRules,
      houseRuleToShow
    } = this.state;
    return (
      <div className="App cursor-default">
        <Head
          chosenHero={chosenHero}
          page={page}
          houseRules={houseRules}
          handleChange={this.handleChange.bind(this)}
          appendToState={this.appendToState.bind(this)}
          resetState={this.resetState.bind(this)}
        />
        <Body
          page={page}
          heros={heros}
          chosenHero={chosenHero}
          heroPage={heroPage}
          houseRules={houseRules}
          houseRuleToShow={houseRuleToShow}
          chooseHero={this.chooseHero.bind(this)}
          removeHero={this.removeHero.bind(this)}
          showHeroPage={this.showHeroPage.bind(this)}
          updateHero={this.updateHero.bind(this)}
          addedHouseRule={this.addedHouseRule.bind(this)}
          setHouseRuleToShow={this.setHouseRuleToShow.bind(this)}
          removeRule={this.removeRule.bind(this)}
        />
      </div>
    );
  }
}

export default App;
