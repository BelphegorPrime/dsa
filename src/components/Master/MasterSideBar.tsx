import React, { Fragment } from "react";

import { getMainProperties } from "../../helperFunctions";
import { MasterSideBarProps } from "../../propTypes";

const MasterSideBar = (props: MasterSideBarProps) => {
  const {
    heros,
    chooseHero,
    selectedHeros,
    setSelectedHeros,
    withProperties
  } = props;
  if (!heros) {
    return null;
  }

  const toggleHero = (name: string, checked: boolean) =>
    checked
      ? setSelectedHeros([...selectedHeros, name])
      : setSelectedHeros(selectedHeros.filter(n => n !== name));

  return (
    <Fragment>
      {Object.keys(heros)
        .sort()
        .map((name, index) => {
          let propertiesString = "";
          if (withProperties) {
            const { properties } = heros[name].converted;
            propertiesString = Object.entries(getMainProperties())
              .map(([key, propKey]) => {
                if (properties) {
                  const property = properties[propKey];
                  return property ? `${key}:${property.value}` : `${key}:`;
                }
              })
              .join(", ");
          }

          return (
            <Fragment key={name + index}>
              <div
                style={{ minHeight: 40 }}
                className="cursor-pointer"
                onClick={() => {
                  toggleHero(name, selectedHeros.indexOf(name) === -1);
                  chooseHero(name);
                }}
              >
                <div className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedHeros.indexOf(name) > -1}
                    onChange={e => {
                      e.stopPropagation();
                      toggleHero(name, e.target.checked);
                    }}
                  />
                  <span className="font-weight-bold pl-2">{name}</span>
                  <br />
                  {withProperties ? propertiesString : null}
                </div>
              </div>
              <hr className="m-0" />
            </Fragment>
          );
        })}
    </Fragment>
  );
};

export default MasterSideBar;
