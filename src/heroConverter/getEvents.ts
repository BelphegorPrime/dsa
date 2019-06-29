import { Child, Event } from "../types";

export default (events: Child[]): Event[] =>
  events.map((e: Child): Event => e.attributes as Event);
