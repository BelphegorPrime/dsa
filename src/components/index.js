import React, { Component, Fragment } from 'react';
import XmlReader from 'xml-reader';
import { sortBy } from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';

import Hero from './Hero';

class App extends Component {
  constructor() {
    super();
    this.initialState = {
      heros: [],
      chosenHero: null,
      masterMode: false
    };
    this.state = this.initialState;
  }

  static rollDice(x) {
    return Math.floor(Math.random() * x) + 1;
  }

  componentDidMount() {
    this.setState({
      // eslint-disable-next-line no-undef
      heros: JSON.parse(window.localStorage.getItem('heros')) || [],
      // eslint-disable-next-line no-undef
      chosenHero: JSON.parse(window.localStorage.getItem('hero')) || null
    });
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextState.chosenHero) {
      // eslint-disable-next-line no-undef
      window.localStorage.setItem('hero', JSON.stringify(nextState.chosenHero));
      // eslint-disable-next-line no-undef
      window.localStorage.setItem('heros', JSON.stringify(nextState.heros));
    }
    return nextState;
  }

  appendToState(xml) {
    this.setState(currentState => {
      const otherHeros = currentState.heros.filter(
        h => h.children[0].attributes.name !== xml.children[0].attributes.name
      );
      const heros = [].concat(xml, ...otherHeros);
      const chosenHero = heros.length > 0 ? xml : null;
      if (chosenHero) {
        // eslint-disable-next-line no-undef
        window.localStorage.setItem('hero', JSON.stringify(chosenHero));
        // eslint-disable-next-line no-undef
        window.localStorage.setItem('heros', JSON.stringify(heros));
      }
      return {
        heros,
        chosenHero
      };
    });
  }

  fileUploaded(files) {
    Object.values(files).forEach(file => {
      // eslint-disable-next-line no-undef
      const fileReader = new FileReader();
      fileReader.onload = e => {
        const xmlReader = XmlReader.create({
          stream: false,
          parentNodes: false,
          tagPrefix: 'tag:',
          doneEvent: 'done',
          emitTopLevelOnly: false
        });
        xmlReader.on('done', data => this.appendToState(data));
        xmlReader.parse(e.target.result);
      };
      fileReader.readAsText(file);
    });
  }

  handleChange(val) {
    this.setState({
      masterMode: val
    });
  }

  chooseHero(name) {
    this.setState(currentState => ({
      chosenHero: currentState.heros.filter(
        h => h.children[0].attributes.name === name
      )[0]
    }));
  }

  removeHero(hero) {
    this.setState({
      heros: this.state.heros.filter(
        h => h.children[0].attributes.name !== hero.name
      )
    });
  }

  clearStorage() {
    // eslint-disable-next-line no-undef
    window.localStorage.removeItem('hero');
    // eslint-disable-next-line no-undef
    window.localStorage.removeItem('heros');
    this.setState(this.initialState);
  }

  render() {
    const { heros, masterMode, chosenHero } = this.state;
    const heroOptions = sortBy(
      heros.map(hero => ({
        name: hero.children[0].attributes.name
      })),
      ['name']
    );

    return (
      <div className="App">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <div className="float-left display-flex">
                <div className="custom-file">
                  <input
                    id="validatedCustomFile"
                    data-testid="validatedCustomFile"
                    className="custom-file-input"
                    type="file"
                    accept="text/xml"
                    multiple={masterMode}
                    onChange={e => this.fileUploaded(e.target.files)}
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="validatedCustomFile">
                    Held hochladen...
                  </label>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={this.clearStorage.bind(this)}>
                  Clear Storage
                </button>
                <div className="hero-name">
                  {chosenHero ? chosenHero.children[0].attributes.name : null}
                </div>
              </div>
              <div className="float-right">
                <label
                  id="master-mode-toggle-label"
                  className="form-check-label"
                  htmlFor="master-mode-toggle">
                  Meistermodus
                </label>
                <div
                  id="master-mode-toggle"
                  className="btn-group btn-group-toggle"
                  data-toggle="buttons">
                  <label
                    data-testid="app-master-mode-off"
                    className={
                      !masterMode
                        ? 'btn btn-secondary active'
                        : 'btn btn-secondary'
                    }
                    htmlFor="master-mode-off">
                    <input
                      id="master-mode-off"
                      type="radio"
                      onChange={this.handleChange.bind(this, false)}
                      checked={!masterMode}
                    />
                    OFF
                  </label>
                  <label
                    data-testid="app-master-mode-on"
                    className={
                      masterMode
                        ? 'btn btn-secondary active'
                        : 'btn btn-secondary'
                    }
                    htmlFor="master-mode-on">
                    <input
                      id="master-mode-on"
                      type="radio"
                      onChange={this.handleChange.bind(this, true)}
                      checked={masterMode}
                    />
                    ON
                  </label>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div id="app-body" className="row">
          {masterMode ? (
            <Fragment>
              <div className="left-pane col-md-1">
                {heroOptions.map((h, index) => (
                  <div
                    key={h.name + index}
                    className="uploaded-hero text-align-center"
                    onClick={this.chooseHero.bind(this, h.name)}>
                    {h.name}{' '}
                    <span onClick={this.removeHero.bind(this, h)}>X</span>
                  </div>
                ))}
              </div>
              <div className="row col-md-11">
                {chosenHero ? <Hero hero={chosenHero} /> : null}
              </div>
            </Fragment>
          ) : (
            <div className="row col-md-12">
              {chosenHero ? <Hero hero={chosenHero} /> : null}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
