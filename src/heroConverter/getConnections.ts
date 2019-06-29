import { Child } from "../rawTypes";
import { Connection } from "../types";

export default (connections: Child[]): Connection[] =>
  connections.map(
    (e: Child): Connection => {
      const { name, beschreibung, so } = e.attributes;
      return {
        name: name ? name : "",
        description: beschreibung ? beschreibung : "",
        socialStatus: so ? so : ""
      };
    }
  );
