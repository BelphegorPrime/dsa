/* eslint-disable no-undef */
import React, { useRef } from 'react';
import proptypes from 'prop-types';
import XmlReader from 'xml-reader';
import XmlPrint from 'xml-printer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index.es';
import { faBars } from '@fortawesome/free-solid-svg-icons/index';

import { convert, reconvert } from '../heroConverter';
import { rollDice, countBy } from '../helperFunctions';

const Head = props => {
  const fileUpload = useRef();
  const {
    chosenHero,
    page,
    resetState,
    appendToState,
    houseRules,
    toggleNavBar,
    setHeros
  } = props;
  const tempThrows = [];
  for (let i = 0; i < 100000; i += 1) {
    tempThrows[i] = rollDice(20);
  }

  const throws = Object.values(countBy(tempThrows));
  const fileUploaded = files => {
    Promise.all(
      Object.values(files).map(file =>
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
      )
    )
      .then(heros => {
        appendToState(heros);
      })
      .then(() => {
        fileUpload.current.value = '';
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
    setHeros(null);
    resetState();
  };

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <div className="float-left display-flex">
            <button
              className="navbar-toggler navbar-toggler-left"
              type="button"
              onClick={toggleNavBar}>
              <FontAwesomeIcon icon={faBars} />
            </button>
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
          </div>
          <div className="float-right display-flex">
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
        </div>
      </div>
    </nav>
  );
};

Head.propTypes = {
  chosenHero: proptypes.object,
  page: proptypes.string,
  houseRules: proptypes.array,
  appendToState: proptypes.func,
  resetState: proptypes.func,
  toggleNavBar: proptypes.func,
  setHeros: proptypes.func
};

export default Head;
