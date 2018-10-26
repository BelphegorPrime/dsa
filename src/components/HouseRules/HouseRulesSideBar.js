import React, { Component } from 'react';
import proptypes from 'prop-types';

import { addId } from '../../helperFunctions';

class HouseRulesSidebar extends Component {
  constructor() {
    super();
    this.fileUpload = React.createRef();
  }

  fileUploaded(files) {
    Object.values(files).forEach(file => {
      new Promise(resolve => {
        // eslint-disable-next-line no-undef
        const fileReader = new FileReader();
        fileReader.onload = e => resolve(e.target.result);
        fileReader.readAsText(file);
      })
        // eslint-disable-next-line no-eval
        .then(script => eval(script))
        .then(rule => addId(rule))
        .then(rule => this.props.addedHouseRule(rule))
        .then(() => {
          this.fileUpload.current.value = '';
        });
    });
  }

  show(template) {
    this.props.setHouseRuleToShow(template);
  }

  renderListElement(template, name) {
    return (
      <li
        key={`rules${template}`}
        className={
          this.props.houseRuleToShow === template
            ? 'list-group-item active'
            : 'list-group-item cursor-pointer'
        }
        onClick={this.show.bind(this, template)}>
        <div className="row">
          <div className="offset-2">{name}</div>
        </div>
      </li>
    );
  }

  render() {
    return (
      <div>
        <div className="row p-2">
          <div className="custom-file cursor-pointer">
            <input
              ref={this.fileUpload}
              id="validatedCustomHouseRuleFile"
              data-testid="validatedCustomHouseRuleFile"
              className="custom-file-input"
              type="file"
              accept="application/javascript"
              multiple={true}
              onChange={e => this.fileUploaded(e.target.files)}
            />
            <label
              className="custom-file-label cursor-pointer"
              htmlFor="validatedCustomHouseRuleFile">
              Hausregel
            </label>
          </div>
        </div>
        <div className="row">
          <ul className="list-group list-group-flush col-md-12">
            {this.renderListElement('templates', 'Vorlagen')}
            <li className="list-group-item cursor-default">
              <div className="row">
                <div className="pl-2">Regeln</div>
              </div>
            </li>
            {['spell', 'weapon'].map(template => {
              switch (template) {
                case 'spell': {
                  return this.renderListElement(template, 'Zauber');
                }
                case 'weapon': {
                  return this.renderListElement(template, 'Waffen');
                }
                default: {
                  return null;
                }
              }
            })}
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
