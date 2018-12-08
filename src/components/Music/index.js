import React, { Fragment, useState, useEffect } from 'react';
// import proptypes from 'prop-types';

import MusicBody from './MusicBody';
import MusicSideBar from './MusicSideBar';

const pages = [
  {
    name: 'Big Creepy',
    iframe: (width = 300, height = 380) => (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/1NQj8C9iYBAMT2pMkpv7X7"
        title="Big Creepy"
        style={{ width, height }}
        frameBorder="0"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Boss Battle',
    iframe: (width = 300, height = 380) => (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/2swfYSnK3UZTaIi8jVMXOM"
        title="Boss Battle"
        style={{ width, height }}
        frameBorder="0"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Creepy',
    iframe: (width = 300, height = 380) => (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/7F6wmIfRPxK8yz728PSlRE"
        title="Creepy"
        style={{ width, height }}
        frameBorder="0"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Mysterious',
    iframe: (width = 300, height = 380) => (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/3ZhIWMM6PVmpyR9Dg33CtU"
        title="Mysterious"
        style={{ width, height }}
        frameBorder="0"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Peaceful',
    iframe: (width = 300, height = 380) => (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/5IUJ6zmUuylwjl4JlRpr32"
        title="Peaceful"
        style={{ width, height }}
        frameBorder="0"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Small Battle',
    iframe: (width = 300, height = 380) => (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/4SmtSXoPWUksFDptSNwzDc"
        title="Small Battle"
        style={{ width, height }}
        frameBorder="0"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Tavern',
    iframe: (width = 300, height = 380) => (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/4QB9fzwznFj5SQS5SUum8E"
        title="Tavern"
        style={{ width, height }}
        frameBorder="0"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Temple',
    iframe: (width = 300, height = 380) => (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/2iszyUMowr8hXUHHfwTJ6g"
        title="Temple"
        style={{ width, height }}
        frameBorder="0"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Town-Day',
    iframe: (width = 300, height = 380) => (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/7KWBfWX0MlXyP1qbHoLJYA"
        title="Town-Day"
        style={{ width, height }}
        frameBorder="0"
        allow="encrypted-media"
      />
    )
  },
  {
    name: 'Underground',
    iframe: (width = 300, height = 380) => (
      <iframe
        src="https://open.spotify.com/embed/user/xd1990/playlist/7L7aTM3d6OUQNdaHchCmJg"
        title="Underground"
        style={{ width, height }}
        frameBorder="0"
        allow="encrypted-media"
      />
    )
  }
];

const Music = () => {
  const [page, setPage] = useState('Big Creepy');
  const [height, setHeight] = useState(null);
  const elem = document.getElementById('music-container');
  useEffect(
    () => {
      setHeight(elem && elem.offsetHeight > 0 ? elem.offsetHeight - 10 : 300);
    },
    [height]
  );

  const pageToShow = pages.filter(p => p.name === page);
  const names = pages.map(p => p.name);

  return (
    <Fragment>
      <div className="left-pane col-md-2 p-0">
        <MusicSideBar pages={names} page={page} setPage={setPage} />
      </div>
      <div
        id="music-container"
        className="right-pane row-without-margin col-md-10">
        {pageToShow.length > 0 ? (
          <MusicBody page={pageToShow[0]} width={'100%'} height={height} />
        ) : null}
      </div>
    </Fragment>
  );
};

Music.propTypes = {};

export default Music;
