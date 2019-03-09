/* eslint-disable no-undef */
import React, { useRef } from 'react';
import proptypes from 'prop-types';

import { addId } from '../../helperFunctions';

const HouseRulesSidebar = props => {
  const fileUpload = useRef();

  const { addNewHouseRules, setHouseRuleToShow, houseRuleToShow } = props;
  const fileUploaded = files => {
    Promise.all(
      Object.values(files).map(file =>
        new Promise(resolve => {
          const fileReader = new FileReader();
          fileReader.onload = e => resolve(e.target.result);
          fileReader.readAsText(file);
        })
          // eslint-disable-next-line no-eval
          .then(script => eval(script))
          .then(rule => addId(rule))
      )
    )
      .then(rules => addNewHouseRules(rules))
      .then(() => (fileUpload.current.value = ''));
  };

  const show = template => {
    setHouseRuleToShow(template);
  };

  const renderListElement = (template, name) => (
    <li
      key={`rules${template}`}
      className={
        houseRuleToShow === template
          ? 'list-group-item active'
          : 'list-group-item cursor-pointer'
      }
      onClick={() => show(template)}>
      <div className="row">
        <div className="offset-2">{name}</div>
      </div>
    </li>
  );

  return (
    <div>
      <div className="row p-2">
        <div className="custom-file cursor-pointer">
          <input
            ref={fileUpload}
            id="validatedCustomHouseRuleFile"
            data-testid="validatedCustomHouseRuleFile"
            className="custom-file-input"
            type="file"
            accept="application/javascript"
            multiple={true}
            onChange={e => fileUploaded(e.target.files)}
          />
          <label
            className="custom-file-label cursor-pointer"
            htmlFor="validatedCustomHouseRuleFile">
            Hausregel
          </label>
        </div>
      </div>
      <div className="row">
        <ul className="list-group list-group-flush col-12">
          {renderListElement('templates', 'Vorlagen')}
          <li className="list-group-item cursor-default">
            <div className="row">
              <div className="pl-2">Regeln</div>
            </div>
          </li>
          {['spell', 'weapon'].map(template => {
            switch (template) {
              case 'spell': {
                return renderListElement(template, 'Zauber');
              }
              case 'weapon': {
                return renderListElement(template, 'Waffen');
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
};

HouseRulesSidebar.propTypes = {
  addNewHouseRules: proptypes.func,
  setHouseRuleToShow: proptypes.func,
  houseRuleToShow: proptypes.string
};

export default HouseRulesSidebar;
