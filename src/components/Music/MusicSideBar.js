import React, { Fragment } from 'react';
import proptypes from 'prop-types';

const MusicSideBar = props => {
  const { page, setPage, pages } = props;
  if (!page) {
    return null;
  }

  return pages.sort().map((name, index) => (
    <Fragment key={name + index}>
      <div className="row cursor-pointer" onClick={() => setPage(name)}>
        <ul className="list-group list-group-flush col-md-12">
          <li
            className={
              name === page ? 'list-group-item active' : 'list-group-item'
            }>
            <div className="row">
              <div className="col-md-9">
                <span className="font-weight-bold">{name}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      {pages.length - 1 !== index ? <hr style={{ margin: 0 }} /> : null}
    </Fragment>
  ));
};

MusicSideBar.propTypes = {
  page: proptypes.string,
  pages: proptypes.array,
  setPage: proptypes.func
};

MusicSideBar.defaultProps = {
  heros: '',
  pages: [],
  setPage: () => {
    console.warn('no setPage function provided');
  }
};

export default MusicSideBar;
