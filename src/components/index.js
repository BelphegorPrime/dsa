import React, { Component, Fragment } from 'react';
import XmlReader from 'xml-reader';
import XmlPrint from 'xml-printer';
import { countBy, values } from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';

import Hero from './Hero';
import SideBar from './Hero/SideBar';
import HouseRules from './HouseRules';
import HouseRulesSideBar from './HouseRules/HouseRulesSideBar';

import convert from '../heroConverter';
import trialToProperty from '../heroConverter/trialToProperty';
import PropertiesQuickBar from './Hero/PropertiesQuickBar';

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
      throws[i] = App.rollDice(20);
    }
    this.throws = values(countBy(throws));
  }

  static noop() {}

  static rollDice(x) {
    return Math.floor(Math.random() * x) + 1;
  }

  static test(trial, properties) {
    const propertyValues = trial.map(trialToProperty).map(property => {
      const possibleProperty = properties[property];
      if (possibleProperty && possibleProperty.value) {
        return possibleProperty.value;
      }
      return 0;
    });
    console.warn(`Eigenschaften: ${propertyValues}`);
    const throws = propertyValues.map(() => App.rollDice(20));
    console.warn(`Gewürfelte Werte: ${throws}`);
    const propertyValue = propertyValues.map((val, i) => val - throws[i]);
    console.warn(`Ergebnisse: ${propertyValue}`);
    return {
      values: `(${propertyValue.join('/')})`,
      diceThrow: propertyValue
        .filter(val => val < 0)
        .reduce((acc, val) => acc + val, 0)
    };
  }

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

  fileUploaded(files) {
    Object.values(files).forEach(file => {
      new Promise(resolve => {
        // eslint-disable-next-line no-undef
        const fileReader = new FileReader();
        fileReader.onload = e => resolve(e.target.result);
        fileReader.readAsText(file);
      })
        .then(
          xmlString =>
            new Promise(resolve => {
              const xmlReader = XmlReader.create({
                stream: false,
                parentNodes: false,
                tagPrefix: 'tag:',
                doneEvent: 'done',
                emitTopLevelOnly: false
              });
              xmlReader.on('done', data => resolve(data));
              xmlReader.parse(xmlString);
            })
        )
        .then(hero =>
          this.appendToState(hero, convert(hero, this.state.houseRules))
        )
        .then(() => {
          this.fileUpload.current.value = '';
        });
    });
  }

  download() {
    const { chosenHero } = this.state;
    // eslint-disable-next-line no-undef
    const doc = document;
    const a = doc.createElement('a');
    a.setAttribute(
      'href',
      `data:text/xml;charset=utf-8,${encodeURIComponent(
        XmlPrint(chosenHero.xml)
      )}`
    );
    a.setAttribute(
      'download',
      `${chosenHero.xml.children[0].attributes.name}.xml`
    );
    a.style.display = 'none';
    doc.body.appendChild(a);
    a.click();
    doc.body.removeChild(a);
  }

  clearStorage() {
    // eslint-disable-next-line no-undef
    window.localStorage.removeItem('hero');
    // eslint-disable-next-line no-undef
    window.localStorage.removeItem('heros');
    this.setState(this.initialState);
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
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <div className="float-left display-flex">
                <div className="custom-file">
                  <input
                    ref={this.fileUpload}
                    id="validatedCustomFile"
                    data-testid="validatedCustomFile"
                    className="custom-file-input"
                    type="file"
                    accept="text/xml"
                    multiple={true}
                    onChange={e => this.fileUploaded(e.target.files)}
                  />
                  <label
                    className="custom-file-label cursor-pointer"
                    htmlFor="validatedCustomFile">
                    Held
                  </label>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={this.download.bind(this)}
                  disabled={!chosenHero}>
                  Download
                </button>
                <button
                  className="btn btn-primary"
                  onClick={this.clearStorage.bind(this)}>
                  Clear Storage
                </button>
                <div className="hero-name">
                  {chosenHero ? (
                    <span className="font-weight-bold">
                      {chosenHero.xml.children[0].attributes.name}
                    </span>
                  ) : null}
                </div>
                {page === 'mastermode' ? (
                  <div
                    className="border border-dark"
                    style={{ height: 36, width: 36, display: 'inherit' }}>
                    {this.throws.map((throwValue, index) => (
                      <div
                        key={index}
                        style={{
                          width: 1.8,
                          marginBottom: throwValue / 200,
                          background: '#000000'
                        }}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="float-right">
                <div
                  id="page-toggle"
                  className="btn-group btn-group-toggle"
                  data-toggle="buttons">
                  <label
                    className={
                      page === 'default'
                        ? 'btn btn-secondary active'
                        : 'btn btn-secondary'
                    }
                    htmlFor="default">
                    <input
                      id="default"
                      type="radio"
                      onChange={this.handleChange.bind(this, 'default')}
                      checked={page === 'default'}
                    />
                    Standard
                  </label>
                  <label
                    className={
                      page === 'mastermode'
                        ? 'btn btn-secondary active'
                        : 'btn btn-secondary'
                    }
                    htmlFor="mastermode">
                    <input
                      id="mastermode"
                      type="radio"
                      onChange={this.handleChange.bind(this, 'mastermode')}
                      checked={page === 'mastermode'}
                    />
                    Meistermodus
                  </label>
                  <label
                    className={
                      page === 'houserules'
                        ? 'btn btn-secondary active'
                        : 'btn btn-secondary'
                    }
                    htmlFor="houserules">
                    <input
                      id="houserules"
                      type="radio"
                      onChange={this.handleChange.bind(this, 'houserules')}
                      checked={page === 'houserules'}
                    />
                    Hausregeln
                  </label>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div id="app-body" className="row">
          {page === 'default' || page === 'mastermode' ? (
            <Fragment>
              <div className="left-pane col-md-2">
                <SideBar
                  heros={heros}
                  chosenHero={chosenHero || null}
                  page={heroPage}
                  chooseHero={this.chooseHero.bind(this)}
                  removeHero={this.removeHero.bind(this)}
                  showPage={this.showHeroPage.bind(this)}
                />
              </div>
              <div className="right-pane col-md-10 row-without-margin">
                {chosenHero ? (
                  <PropertiesQuickBar hero={chosenHero} className="col-md-12" />
                ) : null}
                <div
                  className="row col-md-12"
                  style={{
                    marginLeft: 0,
                    marginRight: 0,
                    maxHeight: 'calc(100% - 41px)'
                  }}>
                  {chosenHero ? (
                    <Hero hero={chosenHero} page={heroPage} />
                  ) : null}
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="left-pane col-md-2">
                <HouseRulesSideBar
                  addedHouseRule={this.addedHouseRule.bind(this)}
                  setHouseRuleToShow={this.setHouseRuleToShow.bind(this)}
                  houseRuleToShow={houseRuleToShow}
                />
              </div>
              <div className="right-pane col-md-10 row-without-margin">
                <div
                  className="row col-md-12"
                  style={{
                    marginLeft: 0,
                    marginRight: 0,
                    maxHeight: 'calc(100% - 41px)'
                  }}>
                  <HouseRules
                    houseRuleToShow={houseRuleToShow}
                    houseRules={houseRules}
                    removeRule={this.removeRule.bind(this)}
                  />
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default App;
