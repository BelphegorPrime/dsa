import React, { Component } from 'react';
import XmlReader from 'xml-reader';
import XmlPrint from 'xml-printer';
import 'bootstrap/dist/css/bootstrap.css';

import Hero from './Hero';
import SideBar from './SideBar';

class App extends Component {
  constructor() {
    super();
    this.initialState = {
      heros: {},
      chosenHero: null,
      page: null,
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
    }
    if (Object.keys(nextState.heros).length > 0) {
      // eslint-disable-next-line no-undef
      window.localStorage.setItem('heros', JSON.stringify(nextState.heros));
    }
    return nextState;
  }

  appendToState(xml) {
    const { name } = xml.children[0].attributes;
    const { state } = this;
    state.chosenHero = xml;
    state.heros = Object.assign(
      {
        [name]: xml
      },
      state.heros
    );
    this.setState(state);
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

  download() {
    const { chosenHero } = this.state;
    // eslint-disable-next-line no-undef
    const doc = document;
    const a = doc.createElement('a');
    a.setAttribute(
      'href',
      `data:text/xml;charset=utf-8,${encodeURIComponent(XmlPrint(chosenHero))}`
    );
    a.setAttribute('download', `${chosenHero.children[0].attributes.name}.xml`);
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

  handleChange(val) {
    this.setState({
      masterMode: val
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
    if (chosenHero.children[0].attributes.name === name) {
      chosenHero = null;
    }
    delete heros[name];
    this.setState({
      heros
    });
  }

  showPage(page) {
    this.setState({
      page
    });
  }

  render() {
    const { heros, masterMode, chosenHero, page } = this.state;
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
                    multiple={true}
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
          <div className="left-pane col-md-2">
            <SideBar
              heros={heros}
              chosenHero={chosenHero}
              page={page}
              chooseHero={this.chooseHero.bind(this)}
              removeHero={this.removeHero.bind(this)}
              showPage={this.showPage.bind(this)}
            />
          </div>
          <div className="row col-md-10">
            {chosenHero ? <Hero hero={chosenHero} page={page} /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
