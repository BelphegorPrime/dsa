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

  const className = 'link';
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
      <ul className="nav nav-pills nav-stacked">
        <li>
          <Link
            id="default"
            to="/"
            className={page === 'default' ? `${className} active` : className}
            style={style}
            onClick={changePage}>
            Standard
          </Link>
        </li>
        <li>
          <hr style={hrStyle} />
        </li>
        <li>
          <Link
            id="mastermode"
            to="/mastermode"
            className={
              page === 'mastermode' ? `${className} active` : className
            }
            style={style}
            onClick={changePage}>
            Meistermodus
          </Link>
        </li>
        <li>
          <hr style={hrStyle} />
        </li>
        <li>
          <Link
            id="houserules"
            to="/houserules"
            className={
              page === 'houserules' ? `${className} active` : className
            }
            style={style}
            onClick={changePage}>
            Hausregeln
          </Link>
        </li>
        <li>
          <hr style={hrStyle} />
        </li>
      </ul>
    </div>
  );
};

Nav.propTypes = {
  page: proptypes.string,
  handleChange: proptypes.func,
  toggleNavBar: proptypes.func
};

export default Nav;
