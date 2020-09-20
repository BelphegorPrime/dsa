import { Child } from "../types/rawTypes";
import { Comment } from "../types/types";
import trialToProperty from "./trialToProperty";

export default (comments: Child[]): Comment[] =>
  comments.map(
    (c: Child): Comment => {
      const {
        id,
        key,
        kommentar,
        added,
        dauer: duration,
        kosten: cost,
        probe,
        sf: specialAbility,
        sfname: specialAbilityName,
        wirkung: effect,
      } = c.attributes;
      let trial: string[] = [];
      if (probe && probe !== "") {
        let split1 = probe;
        if (probe.indexOf("(") > -1) {
          [, split1] = probe.split("(");
        }
        trial = split1.split(")")[0].split("/");
      }
      if (!key) {
        const trialProperties = trial
          .map(trialToProperty)
          .filter((tp: string | null): tp is string => tp !== null);
        return {
          name: "",
          duration,
          cost,
          trial: trial.map((t) => t.split(" ").join("")),
          trialProperties,
          specialAbility,
          specialAbilityName,
          effect,
          comment: kommentar ? kommentar.replace(/&#10;/g, "") : "",
        };
      }
      if (added && id) {
        return {
          name: key,
          comment: kommentar ? kommentar.replace(/&#10;/g, "") : "",
          added,
          id,
        };
      }
      return {
        name: key,
        comment: kommentar ? kommentar.replace(/&#10;/g, "") : "",
      };
    }
  );
