import React, { Fragment } from "react";

import { Hero } from "../../types/types";
import Advantages from "./Advantages";
import Base from "./Base";
import Comments from "./Comments";
import Connections from "./Connections";
import Equipment from "./Equipment";
import Objects from "./Objects";
import Properties from "./Properties";
import Purse from "./Purse";
import SpecialAbilities from "./SpecialAbilities";
import SpellList from "./SpellList";
import TalentList from "./TalentList";

interface HeroBodyProps {
  hero: Hero;
  page: string;
  updateHero: (hero: Hero) => void;
}

const HeroBody = (props: HeroBodyProps) => {
  const { hero, page, updateHero } = props;
  if (!hero) {
    return null;
  }
  const { converted } = hero;
  switch (page) {
    case "Basis": {
      return (
        <Fragment>
          <Base hero={hero} updateHero={updateHero} className="col-6" />
          <Advantages
            advantages={converted.advantages}
            disadvantages={converted.disadvantages}
            className="col-6"
          />
          <hr className="col-12" />
          <Properties properties={converted.properties} className="col-6" />
          <SpecialAbilities
            specialAbilities={converted.specialAbilities}
            className="col-6"
          />
          <hr className="col-12" />
          {converted.connections ? (
            <Connections
              connections={converted.connections}
              className="col-6"
            />
          ) : null}
        </Fragment>
      );
    }
    case "Talente": {
      return (
        <TalentList
          talentList={converted.talentList}
          properties={converted.properties}
          className="col-12"
        />
      );
    }
    case "Zauber": {
      return (
        <SpellList
          spellList={converted.spellList}
          properties={converted.properties}
          className="col-12"
        />
      );
    }
    case "Kampf": {
      return (
        <Fragment>
          <Objects hero={hero} updateHero={updateHero} className="col-4" />
          <Equipment weapons={converted.weapons} className="col-4" />
          <Purse hero={hero} updateHero={updateHero} className="col-4" />
        </Fragment>
      );
    }
    case "Kommentare": {
      return (
        <Comments hero={hero} updateHero={updateHero} className="col-12" />
      );
    }
    default:
      return null;
  }
};

export default HeroBody;
