import React, { Fragment, useState } from 'react';
// import proptypes from 'prop-types';

import MusicBody from './MusicBody';
import MusicSideBar from './MusicSideBar';

const pages = [
  {
    name: 'Big Creepy',
    iframe: (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/1NQj8C9iYBAMT2pMkpv7X7"
        width="300"
        height="380"
        frameBorder="0"
        allowTransparency="true"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Boss Battle',
    iframe: (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/2swfYSnK3UZTaIi8jVMXOM"
        width="300"
        height="380"
        frameBorder="0"
        allowTransparency="true"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Creepy',
    iframe: (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/7F6wmIfRPxK8yz728PSlRE"
        width="300"
        height="380"
        frameBorder="0"
        allowTransparency="true"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Mysterious',
    iframe: (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/3ZhIWMM6PVmpyR9Dg33CtU"
        width="300"
        height="380"
        frameBorder="0"
        allowTransparency="true"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Peaceful',
    iframe: (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/5IUJ6zmUuylwjl4JlRpr32"
        width="300"
        height="380"
        frameBorder="0"
        allowTransparency="true"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Small Battle',
    iframe: (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/4SmtSXoPWUksFDptSNwzDc"
        width="300"
        height="380"
        frameBorder="0"
        allowTransparency="true"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Tavern',
    iframe: (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/4QB9fzwznFj5SQS5SUum8E"
        width="300"
        height="380"
        frameBorder="0"
        allowTransparency="true"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Temple',
    iframe: (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/2iszyUMowr8hXUHHfwTJ6g"
        width="300"
        height="380"
        frameBorder="0"
        allowTransparency="true"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Town-Day',
    iframe: (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/7KWBfWX0MlXyP1qbHoLJYA"
        width="300"
        height="380"
        frameBorder="0"
        allowTransparency="true"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Underground',
    iframe: (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/7L7aTM3d6OUQNdaHchCmJg"
        width="300"
        height="380"
        frameBorder="0"
        allowTransparency="true"
        allow="encrypted-media"
      />
    )
  }
];

const Music = () => {
  const [page, setPage] = useState('Big Creepy');
  const pageToShow = pages.filter(p => p.name === page);
  const names = pages.map(p => p.name);
  return (
    <Fragment>
      <div className="left-pane col-md-2 p-0">
        <MusicSideBar pages={names} page={page} setPage={setPage} />
      </div>
      <div className="right-pane row-without-margin col-md-10">
        <div
          className="row col-md-12 ml-0 mr-0 pt-2"
          style={{
            maxHeight: '100%'
          }}>
          <MusicBody page={pageToShow} />
        </div>
      </div>
    </Fragment>
  );
};

Music.propTypes = {};

export default Music;
