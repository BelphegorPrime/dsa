/* eslint-disable no-undef */
import React, { useRef } from 'react';
import proptypes from 'prop-types';
import { countBy, values } from 'lodash';
import XmlReader from 'xml-reader';
import XmlPrint from 'xml-printer';

import { convert, reconvert } from '../heroConverter';
import { rollDice } from '../helperFunctions';

const Head = props => {
  const fileUpload = useRef();
  const {
    chosenHero,
    page,
    handleChange,
    resetState,
    appendToState,
    houseRules
  } = props;
  const tempThrows = [];
  for (let i = 0; i < 100000; i += 1) {
    tempThrows[i] = rollDice(20);
  }
  const throws = values(countBy(tempThrows));

  const fileUploaded = files => {
    Object.values(files).forEach(file => {
      new Promise(resolve => {
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
        .then(hero => ({
          xml: hero,
          converted: convert(hero, houseRules)
        }))
        .then(hero => appendToState(hero))
        .then(() => {
          fileUpload.current.value = '';
        });
    });
  };

  const download = () => {
    const xmlToDownload = reconvert(chosenHero);
    const doc = document;
    const a = doc.createElement('a');
    a.setAttribute(
      'href',
      `data:text/xml;charset=utf-8,${encodeURIComponent(
        XmlPrint(xmlToDownload)
      )}`
    );
    a.setAttribute(
      'download',
      `${xmlToDownload.children[0].attributes.name}.xml`
    );
    a.style.display = 'none';
    doc.body.appendChild(a);
    a.click();
    doc.body.removeChild(a);
  };

  const clearStorage = () => {
    window.localStorage.removeItem('hero');
    window.localStorage.removeItem('heros');
    resetState();
  };

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <div className="float-left display-flex">
            <div className="custom-file">
              <input
                ref={fileUpload}
                id="validatedCustomFile"
                data-testid="validatedCustomFile"
                className="custom-file-input"
                type="file"
                accept="text/xml"
                multiple={true}
                onChange={e => fileUploaded(e.target.files)}
              />
              <label
                className="custom-file-label cursor-pointer"
                htmlFor="validatedCustomFile">
                Held
              </label>
            </div>
            <button
              className="btn btn-primary"
              onClick={download}
              disabled={!chosenHero}>
              Download
            </button>
            <button className="btn btn-primary" onClick={clearStorage}>
              Speicher leeren
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
                {throws.map((throwValue, index) => (
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
                  onChange={() => handleChange('default')}
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
                  onChange={() => handleChange('mastermode')}
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
                  onChange={() => handleChange('houserules')}
                  checked={page === 'houserules'}
                />
                Hausregeln
              </label>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

Head.propTypes = {
  chosenHero: proptypes.object,
  page: proptypes.string,
  houseRules: proptypes.array,
  handleChange: proptypes.func,
  appendToState: proptypes.func,
  resetState: proptypes.func
};

export default Head;
