import { Child } from "../types/rawTypes";
import { Event } from "../types/types";

export default (events: Child[]): Event[] =>
  events.map((e: Child): Event => e.attributes as Event);
