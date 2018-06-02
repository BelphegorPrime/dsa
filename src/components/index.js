import React, { Component, Fragment } from 'react';
import XmlReader from 'xml-reader';
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

  componentDidMount() {
    // eslint-disable-next-line no-undef
    const chosenHero = JSON.parse(window.localStorage.getItem('hero'));
    if (chosenHero) {
      this.setState(currentState => ({
        chosenHero: chosenHero || null,
        heros: [].concat(...currentState.heros, chosenHero)
      }));
    }
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextState.chosenHero) {
      // eslint-disable-next-line no-undef
      window.localStorage.setItem('hero', JSON.stringify(nextState.chosenHero));
    }
    return nextState;
  }

  appendToState(xml) {
    this.setState(currentState => {
      const heros = [].concat(...currentState.heros, xml);
      const chosenHero = heros.length > 0 ? heros[0] : null;
      if (chosenHero) {
        // eslint-disable-next-line no-undef
        window.localStorage.setItem('hero', JSON.stringify(chosenHero));
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

  removeHero(hero, index) {
    this.setState(currentState => ({
      heros: currentState.heros.filter((h, i) => i !== index)
    }));
  }

  clearStorage() {
    // eslint-disable-next-line no-undef
    window.localStorage.removeItem('hero');
    this.setState(this.initialState);
  }

  render() {
    const { heros, masterMode, chosenHero } = this.state;
    const heroOptions = heros.map(hero => ({
      name: hero.children[0].attributes.name
    }));

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
                    <span onClick={this.removeHero.bind(this, h, index)}>
                      X
                    </span>
                  </div>
                ))}
              </div>
              <div className="col-md-11">
                {chosenHero ? <Hero hero={chosenHero} /> : null}
              </div>
            </Fragment>
          ) : (
            <div className="col-md-12">
              {chosenHero ? <Hero hero={chosenHero} /> : null}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
