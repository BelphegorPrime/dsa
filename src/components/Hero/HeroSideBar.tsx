import React, { Fragment } from "react";
import { ConvertedHero, Hero } from "../../types";

interface SidearProps {
  heros: {
    [name: string]: Hero;
  };
  chooseHero: (hero: string) => void;
  removeHero: (name: string) => void;
  page: string;
  chosenHero: Hero;
  showPage: (page: string) => void;
}

const Sidebar = (props: SidearProps) => {
  const { heros, chooseHero, removeHero, page, chosenHero, showPage } = props;
  if (!heros) {
    return null;
  }
  const getSubMenu = (hero: ConvertedHero, name: string) => (
    <Fragment>
      {["Basis", "Talente", "Zauber", "Kampf", "Kommentare"].map(k => {
        if (hero && k === "Zauber" && !hero.spellList) {
          return null;
        }
        let className = "list-group-item";
        if (
          hero &&
          chosenHero &&
          hero.name === chosenHero.converted.name &&
          page === k
        ) {
          className = "list-group-item active";
        }
        return (
          <li key={name + k} className={className} onClick={() => showPage(k)}>
            {k}
          </li>
        );
      })}
    </Fragment>
  );

  return (
    <Fragment>
      {Object.keys(heros)
        .sort()
        .map((name, index) => (
          <Fragment key={name + index}>
            <div
              className="row cursor-pointer"
              onClick={() => chooseHero(name)}
            >
              <ul className="list-group list-group-flush col-12">
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-9">
                      <span className="font-weight-bold">{name}</span>
                    </div>
                    <span
                      className="btn btn-secondary btn-remove-hero"
                      onClick={e => {
                        e.stopPropagation();
                        removeHero(name);
                      }}
                    >
                      X
                    </span>
                  </div>
                </li>
                {getSubMenu(heros[name].converted, name)}
              </ul>
            </div>
            {Object.keys(heros).length - 1 !== index ? <hr /> : null}
          </Fragment>
        ))}
    </Fragment>
  );
};

Sidebar.defaultProps = {
  heros: [],
  chosenHero: {},
  page: "",
  chooseHero: () => {
    console.warn("no chooseHero Function Provided");
  },
  removeHero: () => {
    console.warn("no removeHero Function Provided");
  },
  showPage: () => {
    console.warn("no showPage Function Provided");
  }
};

export default Sidebar;
