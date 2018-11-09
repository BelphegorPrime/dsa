import React, { Fragment } from 'react';
import proptypes from 'prop-types';

const NoMatch = ({ location }) => (
  <Fragment>
    <div className="left-pane col-md-2" />
    <div className="right-pane col-md-10 row-without-margin">
      <div
        className="row col-md-12"
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
  location: proptypes.object
};

export default NoMatch;
