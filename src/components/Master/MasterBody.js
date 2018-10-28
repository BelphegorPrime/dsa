import React, { Fragment } from 'react';
import proptypes from 'prop-types';

const MasterBody = props => {
  const { hero, page, updateHero } = props;
  if (!hero) {
    return null;
  }
  const { converted } = hero;
  switch (page) {
    case 'Basis': {
      return <div />;
    }
    case 'Talente': {
      return <div />;
    }
    case 'Zauber': {
      return <div />;
    }
    case 'Kampf': {
      return <div />;
    }
    case 'Kommentare': {
      return <div />;
    }
    default:
      return null;
  }
};

MasterBody.propTypes = {
  hero: proptypes.object,
  page: proptypes.string,
  updateHero: proptypes.func
};

export default MasterBody;
