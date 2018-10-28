import React from 'react';
import proptypes from 'prop-types';
import { Link } from 'react-router-dom';

const Nav = props => {
  const { page, handleChange, toggleNavBar } = props;
  const style = { display: 'block', padding: 10 };
  const hrStyle = { margin: 0 };

  const changePage = e => {
    const name = e.target.id;
    handleChange(name);
    toggleNavBar(false);
  };

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
        id="default"
        to="/"
        className={page === 'default' ? 'active' : ''}
        style={style}
        onClick={changePage}>
        Standard
      </Link>
      <hr style={hrStyle} />
      <Link
        id="mastermode"
        to="/mastermode"
        className={page === 'mastermode' ? 'active' : ''}
        style={style}
        onClick={changePage}>
        Meistermodus
      </Link>
      <hr style={hrStyle} />
      <Link
        id="houserules"
        to="/houserules"
        className={page === 'houserules' ? 'active' : ''}
        style={style}
        onClick={changePage}>
        Hausregeln
      </Link>
      <hr style={hrStyle} />
    </div>
  );
};

Nav.propTypes = {
  page: proptypes.string,
  handleChange: proptypes.func,
  toggleNavBar: proptypes.func
};

export default Nav;
