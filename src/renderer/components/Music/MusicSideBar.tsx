import React, { Fragment } from "react";

interface MusicSideBarProps {
  page: string;
  setPage: (name: string) => void;
  pages: string[];
}

const MusicSideBar = ({ page, setPage, pages }: MusicSideBarProps) => {
  return (
    <Fragment>
      {pages.sort().map((name, index) => (
        <Fragment key={name + index}>
          <div className="row cursor-pointer" onClick={() => setPage(name)}>
            <ul className="list-group list-group-flush col-12">
              <li
                className={
                  name === page ? "list-group-item active" : "list-group-item"
                }
              >
                <div className="row">
                  <div className="col-9">
                    <span className="font-weight-bold">{name}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          {pages.length - 1 !== index ? <hr style={{ margin: 0 }} /> : null}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default MusicSideBar;
