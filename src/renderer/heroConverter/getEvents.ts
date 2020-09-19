import { Child } from "../rawTypes";
import { Event } from "../types";

export default (events: Child[]): Event[] =>
  events.map((e: Child): Event => e.attributes as Event);
