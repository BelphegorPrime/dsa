/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import { MasterBodyProps } from "../../types/propTypes";
import { Hero } from "../../types/types";

const MasterBody = ({ heros, selectedHeros }: MasterBodyProps) => {
  const getHeroData = (h: Hero) => {
    const { converted } = h;
    const { fight, name } = converted;
    if (name && selectedHeros.indexOf(name) === -1) {
      return null;
    }
    return (
      <Fragment key={name}>
        <div className="pl-2">
          <div className="font-weight-bold">{name}</div>
          {converted.advantages ? (
            <div className="pl-4">
              <span className="font-weight-bold">Vorteile: </span>
              {converted.advantages
                .map((advantage) =>
                  advantage.value
                    ? `${advantage.name} ${advantage.value}`
                    : `${advantage.name}`
                )
                .join(", ")}
            </div>
          ) : null}
          {converted.disadvantages ? (
            <div className="pl-4">
              <span className="font-weight-bold">Nachteile: </span>
              <span className="font-italic">
                {converted.disadvantages
                  .map((disadvantage) =>
                    disadvantage.value
                      ? `${disadvantage.name} ${disadvantage.value}`
                      : `${disadvantage.name}`
                  )
                  .join(", ")}
              </span>
            </div>
          ) : null}
          <div className="pl-4">
            <span className="font-weight-bold">Kampfwerte: </span>
            {fight
              ? Object.keys(fight)
                  .sort((a, b) => {
                    const f1 = fight[a];
                    const f2 = fight[b];
                    if (f1.attack < f2.attack) {
                      return 1;
                    }
                    if (f1.attack > f2.attack) {
                      return -1;
                    }
                    return 0;
                  })
                  .map((talent) => {
                    const f = fight[talent];
                    return `${talent} (AT:${f.attack}, PA:${f.parade})`;
                  })
                  .join(", ")
              : null}
          </div>
        </div>
        <hr />
      </Fragment>
    );
  };

  return <div>{Object.values(heros).map((h) => getHeroData(h))}</div>;
};

export default MasterBody;
