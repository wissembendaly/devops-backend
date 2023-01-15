import * as moment from "moment";
import "moment-timezone";

export function getTimeFromTimezone(timezone: string): string {
  return moment.tz(timezone).format("HH:mm");
}
