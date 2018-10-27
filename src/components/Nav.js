import React from 'react';
import proptypes from 'prop-types';
import { Link } from 'react-router-dom';

const Nav = props => {
  const { page, handleChange } = props;
  const style = { display: 'block', padding: 10 };
  const hrStyle = { margin: 0 };
  return (
    <div
      style={{
        height: 'calc(100vh - 57px)',
        width: '16.6666667%',
        borderRight: '1px solid lightgrey',
        position: 'absolute',
        zIndex: 5,
        background: 'whitesmoke'
      }}>
      <Link
        to="/"
        className={page === 'default' ? 'active' : ''}
        style={style}
        onClick={() => handleChange('default')}>
        Standard
      </Link>
      <hr style={hrStyle} />
      <Link
        to="/mastermode"
        className={page === 'mastermode' ? 'active' : ''}
        style={style}
        onClick={() => handleChange('mastermode')}>
        Meistermodus
      </Link>
      <hr style={hrStyle} />
      <Link
        to="/houserules"
        className={page === 'houserules' ? 'active' : ''}
        style={style}
        onClick={() => handleChange('houserules')}>
        Hausregeln
      </Link>
      <hr style={hrStyle} />
    </div>
  );
};

Nav.propTypes = {
  page: proptypes.string,
  handleChange: proptypes.func
};

export default Nav;
