import React, { Fragment } from "react";
import { useMainReducer } from "../../context/mainReducer/MainContext";
import { HeroPage } from "../../context/mainReducer/mainReducer";
import { ConvertedHero } from "../../types/types";

const Sidebar = () => {
  const [
    {
      data: { heros, heroPage, chosenHero },
    },
    { setHeroPage, removeHero, chooseHero },
  ] = useMainReducer<true>();

  if (!heros) {
    return null;
  }

  const getSubMenu = (hero: ConvertedHero, name: string) => (
    <Fragment>
      {[
        HeroPage.Basis,
        HeroPage.Talente,
        HeroPage.Zauber,
        HeroPage.Kampf,
        HeroPage.Kommentare,
      ].map((k) => {
        if (hero && k === "Zauber" && !hero.spellList) {
          return null;
        }
        let className = "list-group-item";
        if (
          hero &&
          chosenHero &&
          hero.name === chosenHero.converted.name &&
          heroPage === k
        ) {
          className = "list-group-item active";
        }
        return (
          <li
            key={name + k}
            className={className}
            onClick={() => setHeroPage(k)}
          >
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
                      onClick={(e) => {
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

export default Sidebar;
