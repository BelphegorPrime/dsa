import React, { Component } from 'react';
import proptypes from 'prop-types';

import spellTemplate from '../../templates/spellTemplate';

class HouseRulesSidebar extends Component {
  constructor() {
    super();
    this.fileUpload = React.createRef();
    this.possibleTemplates = ['spell'];
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
        .then(rule => this.props.addedHouseRule(rule))
        .then(() => {
          this.fileUpload.current.value = '';
        });
    });
  }

  show(template) {
    console.log(template);
  }

  download(template) {
    switch (template) {
      case 'spell':
        // eslint-disable-next-line no-undef
        const doc = document;
        const a = doc.createElement('a');
        // eslint-disable-next-line no-undef
        console.log(spellTemplate);
        a.setAttribute(
          'href',
          `data:application/javascript;charset=utf-8,${encodeURIComponent(
            spellTemplate
          )}`
        );
        a.setAttribute('download', `spellTemplate.js`);
        a.style.display = 'none';
        doc.body.appendChild(a);
        a.click();
        doc.body.removeChild(a);
        break;
      default:
        break;
    }
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
                <div>Rules</div>
              </div>
            </li>
            {this.possibleTemplates.map(template => (
              <li
                key={`rules${template}`}
                className="list-group-item"
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
  addedHouseRule: proptypes.func
};

export default HouseRulesSidebar;
