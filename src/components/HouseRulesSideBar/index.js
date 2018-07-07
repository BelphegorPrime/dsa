import React, { Component } from 'react';
import proptypes from 'prop-types';

class HouseRulesSidebar extends Component {
  constructor() {
    super();
    this.fileUpload = React.createRef();
    this.possibleTemplates = ['spell'];
  }

  addId(rule) {
    const returnRule = rule;
    const s4 = () =>
      Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    returnRule.id = `${s4() +
      s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
    return returnRule;
  }

  fileUploaded(files) {
    Object.values(files).forEach(file => {
      new Promise(resolve => {
        // eslint-disable-next-line no-undef
        const fileReader = new FileReader();
        fileReader.onload = e => resolve(e.target.result);
        fileReader.readAsText(file);
      })
        .then(script => eval(script))
        .then(rule => this.addId(rule))
        .then(rule => this.props.addedHouseRule(rule))
        .then(() => {
          this.fileUpload.current.value = '';
        });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  download(template) {
    const templateFile = new Promise(resolve => {
      switch (template) {
        case 'spell': {
          // eslint-disable-next-line no-undef
          fetch('/templates/spellTemplate.js')
            .then(response => response.body)
            .then(body => {
              const reader = body.getReader();
              reader.read().then(({ value }) => {
                resolve({
                  // eslint-disable-next-line no-undef
                  stringValue: new TextDecoder('utf-8').decode(value),
                  name: 'spellTemplate'
                });
              });
            });
          break;
        }
        default: {
          break;
        }
      }
    });
    templateFile.then(file => {
      // eslint-disable-next-line no-undef
      const doc = document;
      const a = doc.createElement('a');
      a.setAttribute(
        'href',
        `data:application/javascript;charset=utf-8,${encodeURIComponent(
          file.stringValue
        )}`
      );
      a.setAttribute('download', `${file.name}.js`);
      a.style.display = 'none';
      doc.body.appendChild(a);
      a.click();
      doc.body.removeChild(a);
    });
  }

  show(template) {
    this.props.setHouseRuleToShow(template);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="custom-file">
            <input
              ref={this.fileUpload}
              id="validatedCustomFile"
              data-testid="validatedCustomFile"
              className="custom-file-input"
              type="file"
              accept="application/javascript"
              multiple={true}
              onChange={e => this.fileUploaded(e.target.files)}
            />
            <label className="custom-file-label" htmlFor="validatedCustomFile">
              Hausregel hochladen...
            </label>
          </div>
        </div>
        <div className="row">
          <ul className="list-group list-group-flush col-md-12">
            <li className="list-group-item">
              <div className="row">
                <div>Templates</div>
              </div>
            </li>
            {this.possibleTemplates.map(template => (
              <li
                key={template}
                className="list-group-item"
                onClick={this.download.bind(this, template)}>
                <div className="row">
                  <div className="offset-2">Zauber</div>
                </div>
              </li>
            ))}
            <li className="list-group-item">
              <div className="row">
                <div>Regeln</div>
              </div>
            </li>
            {this.possibleTemplates.map(template => (
              <li
                key={`rules${template}`}
                className={
                  this.props.houseRuleToShow === template
                    ? 'list-group-item active'
                    : 'list-group-item'
                }
                onClick={this.show.bind(this, template)}>
                <div className="row">
                  <div className="offset-2">Zauber</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

HouseRulesSidebar.propTypes = {
  addedHouseRule: proptypes.func,
  setHouseRuleToShow: proptypes.func,
  houseRuleToShow: proptypes.string
};

export default HouseRulesSidebar;
