import React, { Component } from 'react';
// import proptypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index.es';
import { faDownload } from '@fortawesome/free-solid-svg-icons/index';

class DownloadableTemplates extends Component {
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
        case 'weapon': {
          // eslint-disable-next-line no-undef
          fetch('/templates/weaponTemplate.js')
            .then(response => response.body)
            .then(body => {
              const reader = body.getReader();
              reader.read().then(({ value }) => {
                resolve({
                  // eslint-disable-next-line no-undef
                  stringValue: new TextDecoder('utf-8').decode(value),
                  name: 'weaponTemplate'
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

  render() {
    return ['spell', 'weapon'].map(template => {
      switch (template) {
        case 'spell': {
          return (
            <div
              key={template}
              className="col-md-4 pt-2 pb-2 m-2"
              style={{ maxHeight: 58 }}
              onClick={this.download.bind(this, template)}>
              <div className="p-2 border position-relative">
                <span className="font-weight-bold">Zaubertemplate</span>
                <span className="pr-2 float-right">
                  <FontAwesomeIcon icon={faDownload} />
                </span>
              </div>
            </div>
          );
        }
        case 'weapon': {
          return (
            <div
              key={template}
              className="col-md-4 pt-2 pb-2 m-2"
              style={{ maxHeight: 58 }}
              onClick={this.download.bind(this, template)}>
              <div className="p-2 border position-relative">
                <span className="font-weight-bold">Waffentemplate</span>
                <span className="pr-2 float-right">
                  <FontAwesomeIcon icon={faDownload} />
                </span>
              </div>
            </div>
          );
        }
        default: {
          return null;
        }
      }
    });
  }
}

DownloadableTemplates.propTypes = {};

export default DownloadableTemplates;
