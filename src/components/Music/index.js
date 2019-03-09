import React, { Fragment, useState, useEffect } from 'react';
// import proptypes from 'prop-types';
import MusicBody from './MusicBody';
import MusicSideBar from './MusicSideBar';

const pages = [
  {
    name: 'Big Creepy',
    src:
      'https://open.spotify.com/embed/user/xd1990/playlist/1NQj8C9iYBAMT2pMkpv7X7'
  },
  {
    name: 'Boss Battle',
    src:
      'https://open.spotify.com/embed/user/xd1990/playlist/2swfYSnK3UZTaIi8jVMXOM'
  },
  {
    name: 'Creepy',
    src:
      'https://open.spotify.com/embed/user/xd1990/playlist/7F6wmIfRPxK8yz728PSlRE'
  },
  {
    name: 'Mysterious',
    src:
      'https://open.spotify.com/embed/user/xd1990/playlist/3ZhIWMM6PVmpyR9Dg33CtU'
  },
  {
    name: 'Peaceful',
    src:
      'https://open.spotify.com/embed/user/xd1990/playlist/5IUJ6zmUuylwjl4JlRpr32'
  },
  {
    name: 'Small Battle',
    src:
      'https://open.spotify.com/embed/user/xd1990/playlist/4SmtSXoPWUksFDptSNwzDc'
  },
  {
    name: 'Tavern',
    src:
      'https://open.spotify.com/embed/user/xd1990/playlist/4QB9fzwznFj5SQS5SUum8E'
  },
  {
    name: 'Temple',
    src:
      'https://open.spotify.com/embed/user/xd1990/playlist/2iszyUMowr8hXUHHfwTJ6g'
  },
  {
    name: 'Town-Day',
    src:
      'https://open.spotify.com/embed/user/xd1990/playlist/7KWBfWX0MlXyP1qbHoLJYA'
  },
  {
    name: 'Underground',
    src:
      'https://open.spotify.com/embed/user/xd1990/playlist/7L7aTM3d6OUQNdaHchCmJg'
  }
];

const Music = () => {
  const [page, setPage] = useState('Big Creepy');
  const [height, setHeight] = useState(null);
  // eslint-disable-next-line no-undef
  const elem = document.getElementById('music-container');
  useEffect(() => {
    setHeight(elem && elem.offsetHeight > 0 ? elem.offsetHeight - 10 : 300);
  }, [height]);

  const pageToShow = pages.filter(p => p.name === page);
  const names = pages.map(p => p.name);

  return (
    <Fragment>
      <div className="left-pane col-2 p-0">
        <MusicSideBar pages={names} page={page} setPage={setPage} />
      </div>
      <div
        id="music-container"
        className="right-pane row-without-margin col-10">
        {pageToShow.length > 0 ? (
          <MusicBody src={pageToShow[0].src} height={height} />
        ) : null}
      </div>
    </Fragment>
  );
};

Music.propTypes = {};

export default Music;
