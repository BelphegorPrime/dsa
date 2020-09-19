import React, { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { NavProps } from "../propTypes";

const Nav = ({ page, handleChange, toggleNavBar }: NavProps) => {
  const style = { display: "block", padding: 10 };
  const hrStyle = { margin: 0 };

  const changePage = (e: MouseEvent<HTMLAnchorElement>) => {
    const { id } = e.target as HTMLAnchorElement;
    if (id) {
      handleChange(id);
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
        background: "whitesmoke"
      }}
    >
      <ul className="nav nav-pills nav-stacked">
        <li>
          <Link
            id="default"
            to="/"
            className={page === "default" ? `${className} active` : className}
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
            id="mastermode"
            to="/mastermode"
            className={
              page === "mastermode" ? `${className} active` : className
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
            id="battlemode"
            to="/battlemode"
            className={
              page === "battlemode" ? `${className} active` : className
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
            id="houserules"
            to="/houserules"
            className={
              page === "houserules" ? `${className} active` : className
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
            id="map"
            to="/map"
            className={page === "map" ? `${className} active` : className}
            style={style}
            onClick={changePage}
          >
            Karte
          </Link>
        </li>
        <li>
          <hr style={hrStyle} />
        </li>
        {/*<li>*/}
        {/*  <Link*/}
        {/*    id="music"*/}
        {/*    to="/music"*/}
        {/*    className={page === "music" ? `${className} active` : className}*/}
        {/*    style={style}*/}
        {/*    onClick={changePage}*/}
        {/*  >*/}
        {/*    Musik*/}
        {/*  </Link>*/}
        {/*</li>*/}
      </ul>
    </div>
  );
};

export default Nav;
