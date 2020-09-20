import React, { Fragment, useState } from "react";
import MusicBody from "./MusicBody";
import MusicSideBar from "./MusicSideBar";

const pages = [
  {
    name: "Battle",
    src:
      "https://open.spotify.com/embed/user/xd1990/playlist/4nAImpaQDsuQIYO8WUkfrk"
  },
  {
    name: "Big Creepy",
    src:
      "https://open.spotify.com/embed/user/xd1990/playlist/1NQj8C9iYBAMT2pMkpv7X7"
  },
  {
    name: "Calm Sea",
    src:
      "https://open.spotify.com/embed/user/xd1990/playlist/1ydzBbdl4PB9L4bdZwvGT4"
  },
  {
    name: "Creepy",
    src:
      "https://open.spotify.com/embed/user/xd1990/playlist/7F6wmIfRPxK8yz728PSlRE"
  },
  {
    name: "Mysterious",
    src:
      "https://open.spotify.com/embed/user/xd1990/playlist/3ZhIWMM6PVmpyR9Dg33CtU"
  },
  {
    name: "Peaceful",
    src:
      "https://open.spotify.com/embed/user/xd1990/playlist/5IUJ6zmUuylwjl4JlRpr32"
  },
  {
    name: "Sea Battle",
    src:
      "https://open.spotify.com/embed/user/xd1990/playlist/7rNeoA3t8SpWEAmx3k66Bv"
  },
  {
    name: "Tavern",
    src:
      "https://open.spotify.com/embed/user/xd1990/playlist/4QB9fzwznFj5SQS5SUum8E"
  },
  {
    name: "Temple",
    src:
      "https://open.spotify.com/embed/user/xd1990/playlist/2iszyUMowr8hXUHHfwTJ6g"
  },
  {
    name: "Town-Day",
    src:
      "https://open.spotify.com/embed/user/xd1990/playlist/7KWBfWX0MlXyP1qbHoLJYA"
  },
  {
    name: "Town-Night",
    src:
      "https://open.spotify.com/embed/user/xd1990/playlist/4sBAdk6AKgCZf1rYgG2Gl2"
  },
  {
    name: "Underground",
    src:
      "https://open.spotify.com/embed/user/xd1990/playlist/7L7aTM3d6OUQNdaHchCmJg"
  }
];

const Music = () => {
  const [page, setPage] = useState("Battle");
  const pageToShow = pages.find(p => p.name === page);
  const names = pages.map(p => p.name);

  return (
    <Fragment>
      <div className="left-pane col-2 p-0">
        <MusicSideBar pages={names} page={page} setPage={setPage} />
      </div>
      <div
        id="music-container"
        className="right-pane row-without-margin col-10"
      >
        {pageToShow ? <MusicBody src={pageToShow.src} /> : null}
      </div>
    </Fragment>
  );
};

export default Music;
