import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useMainReducer } from "../context/mainReducer/MainContext";
import { Page } from "../context/mainReducer/mainReducer";

const Nav = () => {
  const [
    {
      data: { page },
    },
    { setPage, toggleNavBar },
  ] = useMainReducer();
  const style = { display: "block", padding: 10 };
  const hrStyle = { margin: 0 };

  const changePage = (e: MouseEvent<HTMLAnchorElement>) => {
    const { id } = e.target as HTMLAnchorElement;
    if (id) {
      setPage(id as Page);
      toggleNavBar(false);
    }
  };

  const className = "link";
  return (
    <div
      style={{
        height: "calc(100vh - 57px)",
        width: "16.6666667%",
        borderRight: "1px solid lightgrey",
        position: "absolute",
        zIndex: 5,
        background: "whitesmoke",
      }}
    >
      <ul className="nav nav-pills nav-stacked">
        <li>
          <Link
            id={Page.default}
            to="/"
            className={
              page === Page.default ? `${className} active` : className
            }
            style={style}
            onClick={changePage}
          >
            Standard
          </Link>
        </li>
        <li>
          <hr style={hrStyle} />
        </li>
        <li>
          <Link
            id={Page.mastermode}
            to="/mastermode"
            className={
              page === Page.mastermode ? `${className} active` : className
            }
            style={style}
            onClick={changePage}
          >
            Meistermodus
          </Link>
        </li>
        <li>
          <hr style={hrStyle} />
        </li>
        <li>
          <Link
            id={Page.battlemode}
            to="/battlemode"
            className={
              page === Page.battlemode ? `${className} active` : className
            }
            style={style}
            onClick={changePage}
          >
            Kampfmodus
          </Link>
        </li>
        <li>
          <hr style={hrStyle} />
        </li>
        <li>
          <Link
            id={Page.houserules}
            to="/houserules"
            className={
              page === Page.houserules ? `${className} active` : className
            }
            style={style}
            onClick={changePage}
          >
            Hausregeln
          </Link>
        </li>
        <li>
          <hr style={hrStyle} />
        </li>
        <li>
          <Link
            id={Page.map}
            to="/map"
            className={page === Page.map ? `${className} active` : className}
            style={style}
            onClick={changePage}
          >
            Karte
          </Link>
        </li>
        <li>
          <hr style={hrStyle} />
        </li>
      </ul>
    </div>
  );
};

export default Nav;
