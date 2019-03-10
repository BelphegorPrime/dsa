import React, { Fragment } from 'react';
import { object } from 'prop-types';

const NoMatch = ({ location }) => (
  <Fragment>
    <div className="left-pane col-2" />
    <div className="right-pane col-10 row-without-margin">
      <div
        className="row col-12"
        style={{
          marginLeft: 0,
          marginRight: 0,
          maxHeight: 'calc(100% - 41px)'
        }}>
        Seite {location.pathname} nicht gefunden.
      </div>
    </div>
  </Fragment>
);

NoMatch.propTypes = {
  location: object
};

export default NoMatch;
